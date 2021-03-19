import { getMastersOrderData, MastersOrder, TypicalResponse } from '../../types'

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

export const getList = async (data: getMastersOrderData) => await wrapTryCatch(get(data))
