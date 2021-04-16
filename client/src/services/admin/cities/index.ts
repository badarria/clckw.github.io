import { City, Response, Paging } from 'types'
import { Method, State } from '../../../components/containers/admin/types'

const adminPath = '/admin/cities'
const getToken = () => localStorage.getItem('token') || ''

const wrapTryCatch = async <T>(tryFunc: T) => {
  try {
    return await tryFunc
  } catch {
    return <Response>{ type: 'error', msg: 'Something went wrong' }
  }
}

type List = { items: City[]; count: number }

const get = async ({ limit, order, orderby, offset }: Paging): Promise<List> => {
  const token = getToken()
  const res = await fetch(`${adminPath}/${limit}/${offset}/${order}/${orderby}`, {
    headers: { token },
  })
  return res.json()
}

const del = async (id: number): Promise<Response> => {
  const token = getToken()
  const res = await fetch(`${adminPath}/${id}`, {
    method: 'DELETE',
    headers: { token },
  })
  return res.json()
}

const putOrPost = async (method: Method, data: City): Promise<Response> => {
  const token = getToken()
  const res = await fetch(`${adminPath}`, {
    method,
    headers: { 'Content-Type': 'application/json', token },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const getCities = async (paging: Paging) => await wrapTryCatch(get(paging))
export const deleteCity = async (id: number) => await wrapTryCatch(del(id))
export const acceptCity = async (data: City, state: State) => {
  const method = state === 'isEditing' ? 'PUT' : 'POST'
  return wrapTryCatch(putOrPost(method, data))
}
