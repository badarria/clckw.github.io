import {
  setColumnsAction,
  setInitStateAction,
  setItemsAction,
  setPagingAction,
  setToastMsgAction,
} from './admin/admin-actions-selector'
import { getFilteredOrders, getItems } from './admin/admin-requests'
import { dateToRequest, getHoursArray, setDisabled } from './utils/datetime-func'
import { setNewOrder, setToastMsg } from '../redux/home-reducer'
import { subjects, subjInitPaging } from '../components/Containers/init-params'
import { sendConfirmLetter, sendRatingLetter } from './home/home-requests'

export const _setAdminPageToastMsg = (subj, toast, dispatch) => {
  dispatch(setToastMsgAction(subj, toast))
  setTimeout(() => {
    dispatch(setToastMsgAction(subj, { type: toast.type, msg: '' }))
  }, 3000)
}

export const _setItems = (subj) => async (dispatch, getState) => {
  const opt = getState()[subj].paging
  const data = await getItems(subj, opt)
  let { items, count } = data
  if (Array.isArray(items)) {
    const paging = { ...getState()[subj].paging }
    paging.count = count
    if (subj === 'orders') items = setDisabled(items)
    await dispatch(setItemsAction(subj, items))
    dispatch(setPagingAction(subj, paging))
    return true
  } else {
    const toast = { type: 'error', msg: 'Something went wrong' }
    _setAdminPageToastMsg(subj, toast, dispatch)
    return false
  }
}

export const _getFreeHours = async (data) => {
  const { master_id, date, service_time, order_id = 0 } = data
  const normDate = dateToRequest(date)
  const orders = await getFilteredOrders({ master_id, date: normDate, order_id }, 'orders')
  return getHoursArray(service_time, orders)
}

export const _setHomePageToastMsg = (toast, dispatch) => {
  dispatch(setToastMsg(toast))
  setTimeout(() => {
    dispatch(setToastMsg({ type: toast.type, msg: '' }))
  }, 3000)
}

export const _resetAdminState = (dispatch) => {
  for (let i = 0; i < subjects.length; i += 1) {
    const subj = subjects[i][0]
    dispatch(setInitStateAction(subj))
  }
}

export const _getAdminInitState = async (dispatch) => {
  for (let i = 0; i < subjects.length; i += 1) {
    const subj = subjects[i][0]
    const columns = subjects[i][1]
    const paging = subjInitPaging[subj]
    dispatch(setPagingAction(subj, paging))
    const done = await dispatch(_setItems(subj))
    if (done) {
      dispatch(setColumnsAction(subj, columns))
    }
  }
  return true
}

export const _sendMails = async (dispatch, getState) => {
  const mailData = getState().home.mailData
  const result = await sendConfirmLetter(mailData)
  console.log(result)
  setTimeout(async () => {
    const result = await sendRatingLetter(mailData)
    console.log(result)
  }, 100000)
}

export const _setOrderData = (data) => (dispatch) => {
  if (data.date instanceof Date) {
    data.date = dateToRequest(data.date)
  }
  dispatch(setNewOrder(data))
}
