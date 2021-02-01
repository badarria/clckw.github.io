import { addItem, updateItem, removeItem, getForeignKeys, getItems, getFilteredOrders } from './api'
import { emptyFields, getServiceTime, mergeWithForeignKeys } from '../utils/table-func'
import { dateFromFormatToObj, dateFromNewDate, dateToRequest, getHoursArray, setDisabled } from '../utils/datetime-func'
const token = localStorage.getItem('token')

const sliceData = (obj, endSlice) => {
  const res = Object.entries(obj).slice(0, endSlice)
  return Object.fromEntries(res)
}

const getFreeHours = async (data) => {
  const { master_id, date, service_time, order_id = 0 } = data
  const normDate = dateToRequest(date)
  const orders = await getFilteredOrders({ master_id, date: normDate, order_id }, 'orders')
  return getHoursArray(service_time, orders)
}

export const loadItems = async (subj, paging) => {
  const data = await getItems(subj, paging, token)
  if (Array.isArray(data?.items)) {
    let { items, count } = data
    paging.count = count
    if (subj === 'orders') items = setDisabled(items)
    return { items, paging }
  } else {
    return { toast: { type: 'error', msg: 'Something went wrong' } }
  }
}

export const removeFromDB = async (subj, id) => await removeItem(subj, id, token)

export const pushToChange = async (subj, data) => {
  const needKeys = ['orders', 'masters']
  const foreignKeys = needKeys.includes(subj) ? await getForeignKeys(subj, token) : null
  let res = Array.isArray(data) ? emptyFields(data) : { ...data }
  if (foreignKeys) res = mergeWithForeignKeys(Object.entries(res), foreignKeys)
  if (subj === 'orders') res.hours = [{ hour: data.begin, booked: false }]
  if (subj === 'services') {
    let keys = { time: getServiceTime() }
    res.time_id = Number(res.time)
    res = mergeWithForeignKeys(Object.entries(res), keys)
  }
  return res
}

export const acceptChanges = async (subj, data, state) => {
  data.token = token
  return state === 'isEditing' ? await updateItem(subj, data) : await addItem(subj, data)
}

export const changeFreeHours = async (data) => await getFreeHours(data)

export const preparedOrdersData = (data) => {
  const fields = sliceData(data, -6)
  const date = data.date ? dateFromFormatToObj(data.date) : dateFromNewDate()
  const hours = data.hours
  return { fields, date, hours, begin: data.begin }
}

export const preparedMastersData = (data) => sliceData(data, -1)
