import { addNewOrder, checkAuth, getCustomer, getFreeMasters, loginUser } from './api'
import { getItems } from '../admin/api'
import {
  setFormData,
  setAuth,
  setFreeMasters,
  setWorkingHours,
  setLoader,
  setMailData,
} from '../../store/reducers/home-reducer'
import { getHoursArray, toFormat } from '../common/utils/datetime-func'
import { mergeWithForeignKeys } from '../admin/utils/table-func'
import {
  _getAdminInitState,
  _resetAdminState,
  _sendMails,
  _setHomePageToastMsg,
  _setItems,
  _setOrderData,
} from '../common'

export const getInitState = async (dispatch, getState) => {
  const isCityInit = getState().home.formData.city === ''
  const isServiceInit = getState().home.formData.service === ''
  const isLoading = getState().home.loading
  console.log('init')
  if (!isLoading && isCityInit && isServiceInit) {
    dispatch(setLoader(true))
    const data = { limit: 'all', offset: 0, orderby: 'id', order: 'asc' }
    const city = await getItems('cities', data)
    const service = await getItems('services', data)
    const hours = getHoursArray(service.time)
    const formData = Object.entries(getState().home.formData)
    const keys = { city: city.items, service: service.items }
    const res = mergeWithForeignKeys(formData, keys)
    res.hours = hours
    dispatch(setFormData(res))
    dispatch(setLoader(false))
  }
}

export const changeHours = (service_time) => (dispatch) => {
  const newHours = getHoursArray(service_time)
  dispatch(setWorkingHours(newHours))
}

export const findMasters = (data) => async (dispatch) => {
  dispatch(setFreeMasters([]))
  dispatch(setLoader(true))
  const masters = await getFreeMasters(data)
  dispatch(setLoader(false))
  if (masters.length) {
    dispatch(setFreeMasters(masters))
    return true
  } else {
    let msg = 'Sorry, there are no free masters. Try to choose another time'
    _setHomePageToastMsg({ type: 'info', msg }, dispatch)
    return false
  }
}

export const processData = (data) => async (dispatch) => {
  const { service, city, begin, end, email, name, surname } = data
  const id = await getCustomer({ email, name, surname })
  if (typeof id === 'number') {
    const orderData = { service: service.id, begin, end, customer: id }
    const mailData = {
      name,
      userEmail: email,
      city,
      begin: toFormat(begin),
      service: service.name,
    }
    dispatch(_setOrderData(orderData))
    dispatch(setMailData(mailData))
  }
}

export const acceptOrder = ({ id, masterName }) => async (dispatch, getState) => {
  dispatch(setLoader(true))
  const isAuth = getState().home.isAuth
  dispatch(_setOrderData({ master: id }))
  dispatch(setMailData({ master: masterName }))
  const orderData = { ...getState().home.newOrder }
  let res = await addNewOrder(orderData)
  dispatch(setLoader(false))
  if (res?.id) {
    dispatch(setFreeMasters([]))
    dispatch(setMailData({ orderId: res.id }))
    dispatch(_sendMails)
    res = { type: 'success', msg: res.msg }
    dispatch(_setOrderData({}))
  }
  if (isAuth) {
    await dispatch(_setItems('orders'))
    await dispatch(_setItems('customers'))
  }
  _setHomePageToastMsg(res, dispatch)
}

export const login = (data) => async (dispatch) => {
  dispatch(setLoader(true))
  const res = await loginUser(data)
  if (res.token) {
    localStorage.setItem('token', res.token)
    dispatch(setAuth(true))
    await dispatch(_getAdminInitState)
    dispatch(setLoader(false))
    return { status: true, msg: 'Success' }
  } else {
    dispatch(setLoader(false))
    return { status: false, msg: res }
  }
}

export const stayAuth = async (dispatch) => {
  const token = localStorage.getItem('token')
  if (token) {
    dispatch(setLoader(true))
    const isAuth = await checkAuth(token)
    if (isAuth === true) {
      dispatch(setAuth(true))
      await dispatch(_getAdminInitState)
    } else {
      dispatch(logout)
    }
    dispatch(setLoader(false))
  }
}
export const logout = (dispatch) => {
  localStorage.removeItem('token')
  dispatch(setAuth(false))
  dispatch(_resetAdminState)
}
