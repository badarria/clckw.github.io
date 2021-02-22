import { setAuth, setMailData, setNewOrder } from '../../store/reducer'
import { addNewOrder, checkAuth, getCustomer, getFreeMasters, getInit, loginUser, sendConfirmLetter, sendRatingLetter } from './api'
import { dateFromNewDate, getBeginFinish, getHoursArray, toMailFormat } from '../utils/datetime-func'

const sendMails = async (dispatch, getState) => {
  const mailData = getState().mailData
  const result = await sendConfirmLetter(mailData)
  console.log(result)
  setTimeout(async () => {
    const result = await sendRatingLetter(mailData)
    console.log(result)
  }, 100000)
}

export const login = (data) => async (dispatch) => {
  const res = await loginUser(data)
  if (res.token) {
    localStorage.setItem('token', res.token)
    dispatch(setAuth(true))
    return { status: true, msg: 'Success' }
  } else {
    dispatch(setAuth(false))
    return { status: false, msg: res }
  }
}

export const stayAuth = async (dispatch) => {
  const token = localStorage.getItem('token')
  if (token) {
    const isAuth = await checkAuth(token)
    if (isAuth === true) {
      dispatch(setAuth(true))
    } else {
      localStorage.removeItem('token')
      dispatch(setAuth(false))
    }
  } else dispatch(setAuth(false))
}

export const getInitState = async (data) => {
  const { city, service } = await getInit()
  const fields = { ...data, city: [data.city, ...city], service: [data.service, ...service] }
  const hours = getHoursArray(service.time)
  const date = dateFromNewDate()

  return { fields, date, hours }
}

export const changeHours = (service_time) => getHoursArray(service_time)

export const findMasters = async ({ city, hours, service, date }) => {
  const { begin, finish } = getBeginFinish(date, hours, service.time)
  const data = { city: city.id, begin, finish }
  const res = await getFreeMasters(data)

  return res
}

export const processData = (data) => async (dispatch) => {
  const { service, city, hours, date, email, name, surname } = data
  const { begin, finish } = getBeginFinish(date, hours, service.time)
  const id = await getCustomer({ email, name, surname })
  if (typeof id === 'number') {
    const orderData = { service: service.id, begin, finish, customer: id }
    const mailData = { name, userEmail: email, city: city.name, begin: toMailFormat(begin), service: service.name }
    dispatch(setNewOrder(orderData))
    dispatch(setMailData(mailData))
  }
}

export const acceptOrder = ({ id, masterName }) => async (dispatch, getState) => {
  dispatch(setNewOrder({ master: id }))
  dispatch(setMailData({ master: masterName }))
  const orderData = { ...getState().newOrder }
  let res = await addNewOrder(orderData)

  if (res.type === 'success') {
    dispatch(setMailData({ orderId: res.id }))
    dispatch(sendMails)
    dispatch(setNewOrder({}))
  }
  return res
}

export const logout = (dispatch) => {
  localStorage.removeItem('token')
  dispatch(setAuth(false))
}
