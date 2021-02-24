import { Customer, Method, State, TypicalResponse, CustomersList, Paging } from 'types'
const adminPath = '/admin/customers'
const getToken = () => localStorage.getItem('token') || ''

const wrapTryCatch = async <T>(tryFunc: T) => {
  try {
    return await tryFunc
  } catch {
    return { type: 'error', msg: 'Something went wrong' } as TypicalResponse
  }
}

const get = async ({ limit, order, orderby, offset }: Paging): Promise<CustomersList> => {
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

const putOrPost = async (method: Method, data: Customer): Promise<TypicalResponse> => {
  const token = getToken()
  const res = await fetch(`${adminPath}`, {
    method,
    headers: { 'Content-Type': 'application/json', token },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const getCustomers = async (paging: Paging) => await wrapTryCatch(get(paging))
export const deleteCustomer = async (id: number) => await wrapTryCatch(del(id))
export const acceptCustomer = async (data: Customer, state: State) => {
  const method = state === 'isEditing' ? 'PUT' : 'POST'
  return wrapTryCatch(putOrPost(method, data))
}
