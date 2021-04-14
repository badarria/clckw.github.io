import { ChangeStatus, getUsersOrderData, UsersOrder, TypicalResponseType } from '../../types'

const getToken = () => localStorage.getItem('token') || ''
const customerPath = 'customer'

const wrapTryCatch = async <T>(tryFunc: T) => {
  try {
    return await tryFunc
  } catch {
    return { type: 'error', msg: 'Something went wrong' } as TypicalResponseType
  }
}

const get = async (data: getUsersOrderData): Promise<UsersOrder[]> => {
  const { id, limit, offset, order, orderby } = data
  const token = getToken()
  const res = await fetch(`${customerPath}/${id}/${limit}/${offset}/${order}/${orderby}`, { headers: { token } })
  return res.json()
}

const rating = async (data: { id: number; rating: number }): Promise<TypicalResponseType> => {
  const token = getToken()

  const res = await fetch(`${customerPath}/rating`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', token },
    body: JSON.stringify(data),
  })
  return res.json()
}

// const send = async (data: DataForRatingRequest): Promise<TypicalResponse> => {
//   const token = getToken()
//   const res = await fetch(`${customerPath}/sendMail`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json', token },
//     body: JSON.stringify(data),
//   })
//   return res.json()
// }

export const setRating = async (data: { id: number; rating: number }) => await wrapTryCatch(rating(data))
export const getList = async (data: getUsersOrderData) => await wrapTryCatch(get(data))
// export const sendRatingMail = async (data: DataForRatingRequest) => await wrapTryCatch(send(data))
