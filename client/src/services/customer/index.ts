import { Paging, Response } from '../../types'

type GetOrders = Paging & { id: number }
type UserOrders = {
  id: number
  m: { fullName: string }
  c: { fullName: string; email: string }
  s: { service: string; price: number }
  begin: string
  finish: string
  rating: number
  date: string
  completed: boolean
}

const getToken = () => localStorage.getItem('token') || ''
const customerPath = 'customer'

const wrapTryCatch = async <T>(tryFunc: T) => {
  try {
    return await tryFunc
  } catch {
    return <Response>{ type: 'error', msg: 'Something went wrong' }
  }
}

const get = async (data: GetOrders): Promise<UserOrders[]> => {
  const { id, limit, offset, order, orderby } = data
  const token = getToken()
  const res = await fetch(`${customerPath}/${id}/${limit}/${offset}/${order}/${orderby}`, { headers: { token } })
  return res.json()
}

const rating = async (data: { id: number; rating: number }): Promise<Response> => {
  const token = getToken()

  const res = await fetch(`${customerPath}/rating`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', token },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const setRating = async (data: { id: number; rating: number }) => await wrapTryCatch(rating(data))
export const getList = async (data: GetOrders) => await wrapTryCatch(get(data))
