import { Service, Method, State, TypicalResponse, ServicesList, Paging } from 'types'
const adminPath = '/admin/services'
const getToken = () => localStorage.getItem('token') || ''

const wrapTryCatch = async <T>(tryFunc: T) => {
  try {
    return await tryFunc
  } catch {
    return { type: 'error', msg: 'Something went wrong' } as TypicalResponse
  }
}

const get = async ({ limit, order, orderby, offset }: Paging): Promise<ServicesList> => {
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

const putOrPost = async (method: Method, data: Service): Promise<TypicalResponse> => {
  const token = getToken()
  const res = await fetch(`${adminPath}`, {
    method,
    headers: { 'Content-Type': 'application/json', token },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const getServices = async (paging: Paging) => await wrapTryCatch(get(paging))
export const deleteService = async (id: number) => await wrapTryCatch(del(id))
export const acceptService = async (data: Service, state: State) => {
  const method = state === 'isEditing' ? 'PUT' : 'POST'
  return wrapTryCatch(putOrPost(method, data))
}
