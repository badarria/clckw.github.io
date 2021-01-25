import { dateFromFormatToObj, dateFromNewDate } from '../../services/common/utils/datetime-func'

export const getItemsState = (subj, state) => state[subj].list
export const getColumnsState = (subj, state) => state[subj].columns

/////dataForm states
export const _sliceData = (obj, endSlice) => {
  const res = Object.entries(obj).slice(0, endSlice)
  return Object.fromEntries(res)
}

const _ordersDataState = (state) => {
  const data = state.orders.dataToChange
  const fields = _sliceData(data, -6)
  const date = data.date ? dateFromFormatToObj(data.date) : dateFromNewDate()
  const hours = data.hours
  return { fields, date, hours, begin: data.begin }
}

const _mastersDataState = (state) => {
  const data = state.masters.dataToChange
  return _sliceData(data, -1)
}

export const getDataState = (subj, state) => {
  if (subj === 'orders') return _ordersDataState(state)
  else if (subj === 'masters') return _mastersDataState(state)
  else return state[subj].dataToChange
}

export const editStateState = (subj, state) => state[subj].editState

export const getFormDataState = (state) => {
  const data = state.home.formData
  const date = dateFromNewDate()
  return {
    fields: _sliceData(data, -2),
    date: date,
    hours: data.hours,
    begin: data.begin,
  }
}

export const getAuthState = (state) => state.home.isAuth
export const getFreeMastersState = (state) => state.home.freeMasters
export const getToastMsgState = (subj, state) => state[`${subj}`].toast
export const getLoadingState = (subj, state) => state[subj].loading
export const getPagingState = (subj, state) => state[subj].paging
export const orderToRateState = (state) => state.rating.orderToRate
export const getStatusState = (state) => state.rating.status
