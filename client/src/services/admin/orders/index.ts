import { OrdersKey, Method, State, TypicalResponse, FilteredOrders, NewOrderData } from 'types'
import { OrdersList, Paging } from 'types'
const adminPath = '/admin/orders'
const getToken = () => localStorage.getItem('token') || ''

const wrapTryCatch = async <T>(tryFunc: T) => {
  try {
    return await tryFunc
  } catch {
    return { type: 'error', msg: 'Something went wrong' } as TypicalResponse
  }
}

const get = async ({ limit, order, orderby, offset }: Paging): Promise<OrdersList> => {
  const token = getToken()
  const res = await fetch(`${adminPath}/${limit}/${offset}/${order}/${orderby}`, {
    headers: { token },
  })
  return res.json()
}

const del = async (id: number): Promise<TypicalResponse> => {
  const token = getToken()
  const res = await fetch(`${adminPath}/${id}`, {
    method: 'DELETE',
    headers: { token },
  })
  return res.json()
}

const putOrPost = async (method: Method, data: NewOrderData): Promise<TypicalResponse> => {
  console.log(data)
  const token = getToken()
  const res = await fetch(`${adminPath}`, {
    method,
    headers: { 'Content-Type': 'application/json', token },
    body: JSON.stringify(data),
  })
  return res.json()
}

const getKeys = async (): Promise<OrdersKey> => {
  const token = getToken()
  const res = await fetch(`${adminPath}/foreignKeys`, { headers: { token } })
  return res.json()
}

const getFiltered = async (master_id: number, order_id: number, date: string): Promise<FilteredOrders> => {
  const res = await fetch(`${adminPath}/filtered?date=${date}&master_id=${master_id}&order_id=${order_id}`)
  return res.json()
}

export const getOrders = async (paging: Paging) => await wrapTryCatch(get(paging))
export const deleteOrder = async (id: number) => await wrapTryCatch(del(id))
export const acceptOrder = async (data: NewOrderData, state: State) => {
  const method = state === 'isEditing' ? 'PUT' : 'POST'
  return await wrapTryCatch(putOrPost(method, data))
}
export const getOrdersKeys = async () => await wrapTryCatch(getKeys())
export const getFilteredOrders = async (master_id: number, order_id: number, date: string) =>
  await wrapTryCatch(getFiltered(master_id, order_id, date))
