import { DataForRatingRequest, getUsersOrderData, UsersOrder, TypicalResponse } from '../../types'

const getToken = () => localStorage.getItem('token') || ''
const masterPath = 'master'

const wrapTryCatch = async <T>(tryFunc: T) => {
  try {
    return await tryFunc
  } catch {
    return { type: 'error', msg: 'Something went wrong' } as TypicalResponse
  }
}

const get = async (data: getUsersOrderData): Promise<UsersOrder[]> => {
  const { id, limit, offset, order, orderby } = data
  const token = getToken()
  const res = await fetch(`${masterPath}/${id}/${limit}/${offset}/${order}/${orderby}`, { headers: { token } })
  return res.json()
}

const done = async (id: number): Promise<TypicalResponse> => {
  const token = getToken()

  const res = await fetch(`${masterPath}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', token },
    body: JSON.stringify({ id }),
  })
  return res.json()
}

const send = async (data: DataForRatingRequest): Promise<TypicalResponse> => {
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

export const getOrdersPhoto = async (id: number) => await wrapTryCatch(getPhoto(id))
export const setDone = async (id: number) => await wrapTryCatch(done(id))
export const getList = async (data: getUsersOrderData) => await wrapTryCatch(get(data))
export const sendRatingMail = async (data: DataForRatingRequest) => await wrapTryCatch(send(data))
