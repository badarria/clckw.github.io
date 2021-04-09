import { FbResDtT, GglSignUpDtT, LocalSignUpDtT } from './../../components/containers/header/types'
import { LocalSignInDtT, SignInResDtT } from '../../components/containers/header/types'
import {
  Customer,
  ParamsForSearching,
  DataForLetter,
  FreeMastersList,
  CustomerResponse,
  TypicalResponseType,
  MailResponse,
  InitData,
  OrderResponse,
  DataForNewOrder,
  UserResponse,
} from 'types'

const homePath = '/home'

const wrapTryCatch = async <T>(tryFunc: T) => {
  try {
    return await tryFunc
  } catch {
    return { type: 'error', msg: 'Something went wrong' } as TypicalResponseType
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

const login = async (data: LocalSignInDtT): Promise<SignInResDtT> => {
  const res = await fetch(`${homePath}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const add = async (data: DataForNewOrder): Promise<OrderResponse> => {
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

const check = async (token: string): Promise<UserResponse> => {
  const res = await fetch(`${homePath}/verify`, { headers: { token } })
  return res.json()
}

const init = async (): Promise<InitData> => {
  const res = await fetch(`${homePath}/init`)
  return res.json()
}

const registr = async (data: LocalSignUpDtT): Promise<UserResponse> => {
  const res = await fetch(`${homePath}/signUp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const payment = async (data: { id: string; amount: number }): Promise<any> => {
  const res = await fetch(`${homePath}/handlePay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const googleUser = async (data: { token: string }) => {
  const res = await fetch(`${homePath}/signInGoogle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}
const newGoogleUser = async (data: GglSignUpDtT) => {
  const res = await fetch(`${homePath}/signUpGoogle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const fbUser = async (data: FbResDtT) => {
  const res = await fetch(`${homePath}/signInFb`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const getFreeMasters = async (data: ParamsForSearching) => await wrapTryCatch(getMasters(data))
export const getCustomer = async (data: Partial<Customer>) => await wrapTryCatch(upsertCustomer(data))
export const loginUser = async (data: LocalSignInDtT) => await wrapTryCatch(login(data))
export const addNewOrder = async (data: DataForNewOrder) => await wrapTryCatch(add(data))
export const sendConfirmLetter = async (data: DataForLetter) => await wrapTryCatch(sendFirstLetter(data))
export const sendRatingLetter = async (data: DataForLetter) => await wrapTryCatch(sendSecondLetter(data))
export const getInit = async () => await wrapTryCatch(init())
export const checkUserAuth = async (token: string) => await wrapTryCatch(check(token))
export const regUser = async (data: LocalSignUpDtT) => await wrapTryCatch(registr(data))
export const handlePayment = async (data: { id: string; amount: number }) => await wrapTryCatch(payment(data))
export const authGoogleUser = async (data: { token: string }) => await wrapTryCatch(googleUser(data))
export const regGoogleUser = async (data: GglSignUpDtT) => await wrapTryCatch(newGoogleUser(data))
export const signInFbUser = async (data: FbResDtT) => await wrapTryCatch(fbUser(data))
