import { ChangeStatus, Photo } from '../../components/containers/master/types'
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
  photos: Photo[]
}

const getToken = () => localStorage.getItem('token') || ''
const masterPath = 'master'

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
  const res = await fetch(`${masterPath}/${id}/${limit}/${offset}/${order}/${orderby}`, { headers: { token } })
  return res.json()
}

const done = async (id: number): Promise<Response> => {
  const token = getToken()

  const res = await fetch(`${masterPath}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', token },
    body: JSON.stringify({ id }),
  })
  return res.json()
}

const send = async (data: ChangeStatus): Promise<Response> => {
  const token = getToken()
  const res = await fetch(`${masterPath}/sendMail`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', token },
    body: JSON.stringify(data),
  })
  return res.json()
}

const getPhoto = async (id: number): Promise<string> => {
  const token = getToken()
  const res = await fetch(`${masterPath}/getPhotos/${id}`, { headers: { token } })
  return res.json()
}

const getPdf = async (id: number): Promise<Blob> => {
  const token = getToken()
  const res = await fetch(`${masterPath}/downloadPdf/${id}`, { headers: { responseType: 'blob', token } })
  return res.blob()
}

export const getOrdersPhoto = async (id: number) => await wrapTryCatch(getPhoto(id))
export const setDone = async (id: number) => await wrapTryCatch(done(id))
export const getList = async (data: GetOrders) => await wrapTryCatch(get(data))
export const sendRatingMail = async (data: ChangeStatus) => await wrapTryCatch(send(data))
export const getOrdersReceipt = async (id: number) => await wrapTryCatch(getPdf(id))
