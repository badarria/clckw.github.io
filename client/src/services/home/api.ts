import {
  Customer,
  ParamsForSearching,
  LoginData,
  Order,
  DataForLetter,
  FreeMastersList,
  CustomerResponse,
  LoginResponse,
  TypicalResponse,
  MailResponse,
  InitData,
  OrderResponse,
  DataForNewOrder,
} from 'types'

const homePath = '/home'

const wrapTryCatch = async <T>(tryFunc: T) => {
  try {
    return await tryFunc
  } catch {
    return { type: 'error', msg: 'Something went wrong' } as TypicalResponse
  }
}

const getMasters = async ({ city, begin, finish }: ParamsForSearching): Promise<FreeMastersList> => {
  const res = await fetch(`${homePath}/find/${city}/${begin}/${finish}`)
  return res.json()
}

const upsertCustomer = async (data: Partial<Customer>): Promise<CustomerResponse> => {
  const res = await fetch(`${homePath}/customer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const login = async (data: LoginData): Promise<LoginResponse> => {
  const res = await fetch(`${homePath}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const add = async (data: DataForNewOrder): Promise<OrderResponse> => {
  console.log(data)
  const res = await fetch(`${homePath}/newOrder`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const sendFirstLetter = async (data: DataForLetter): Promise<MailResponse> => {
  const res = await fetch(`${homePath}/confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const sendSecondLetter = async (data: DataForLetter): Promise<MailResponse> => {
  const res = await fetch(`${homePath}/rating`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const check = async (token: string): Promise<boolean> => {
  const res = await fetch(`${homePath}/verify`, { headers: { token } })
  return res.json()
}

const init = async (): Promise<InitData> => {
  const res = await fetch(`${homePath}/init`)
  return res.json()
}

export const getFreeMasters = async (data: ParamsForSearching) => await wrapTryCatch(getMasters(data))
export const getCustomer = async (data: Partial<Customer>) => await wrapTryCatch(upsertCustomer(data))
export const loginUser = async (data: LoginData) => await wrapTryCatch(login(data))
export const addNewOrder = async (data: DataForNewOrder) => await wrapTryCatch(add(data))
export const sendConfirmLetter = async (data: DataForLetter) => await wrapTryCatch(sendFirstLetter(data))
export const sendRatingLetter = async (data: DataForLetter) => await wrapTryCatch(sendSecondLetter(data))
export const checkAuth = async (token: string) => await wrapTryCatch(check(token))
export const getInit = async () => await wrapTryCatch(init())