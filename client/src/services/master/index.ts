import { DataForRatingRequest, getMastersOrderData, MastersOrder, TypicalResponse } from '../../types'

const getToken = () => localStorage.getItem('token') || ''
const masterPath = 'master'
const wrapTryCatch = async <T>(tryFunc: T) => {
  try {
    return await tryFunc
  } catch {
    return { type: 'error', msg: 'Something went wrong' } as TypicalResponse
  }
}

const get = async (data: getMastersOrderData): Promise<MastersOrder[]> => {
  const { id, limit, offset, order, orderby } = data
  const token = getToken()
  const res = await fetch(`${masterPath}/${id}/${limit}/${offset}/${order}/${orderby}`, { headers: { token } })
  return res.json()
}

const done = async (data: DataForRatingRequest): Promise<TypicalResponse> => {
  const token = getToken()
  console.log('inds')
  const res = await fetch(`${masterPath}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', token },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const setDone = async (data: DataForRatingRequest) => await wrapTryCatch(done(data))
export const getList = async (data: getMastersOrderData) => await wrapTryCatch(get(data))
