import { Master, City, Response, Paging } from '../../../types'
import { NewMaster, Method, State } from '../../../components/containers/admin/types'

const adminPath = '/admin/masters'
const getToken = () => localStorage.getItem('token') || ''

const wrapTryCatch = async <T>(tryFunc: T) => {
  try {
    return await tryFunc
  } catch {
    return <Response>{ type: 'error', msg: 'Something went wrong' }
  }
}

type List = { items: Master[]; count: number }

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

const putOrPost = async (method: Method, data: NewMaster): Promise<Response> => {
  const token = getToken()
  const res = await fetch(`${adminPath}`, {
    method,
    headers: { 'Content-Type': 'application/json', token },
    body: JSON.stringify(data),
  })
  return res.json()
}

const getKeys = async (): Promise<City[]> => {
  const token = getToken()
  const res = await fetch(`${adminPath}/foreignKeys`, { headers: { token } })
  return res.json()
}

export const getMasters = async (paging: Paging) => await wrapTryCatch(get(paging))
export const deleteMaster = async (id: number) => await wrapTryCatch(del(id))
export const acceptMaster = async (data: NewMaster, state: State) => {
  const method = state === 'isEditing' ? 'PUT' : 'POST'
  return await wrapTryCatch(putOrPost(method, data))
}
export const getMastersKeys = async () => await wrapTryCatch(getKeys())
