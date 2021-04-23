import { GoogleSignUp, LocalSignUp, LocalSignIn, SignRes } from './../../components/containers/header/types'
import { Customer, Response, Master, City, Service } from '../../types'
import { Post } from '../../components/containers/home/types'
const homePath = '/home'

const wrapTryCatch = async <T>(tryFunc: T) => {
  try {
    return await tryFunc
  } catch {
    return <Response>{ type: 'error', msg: 'Something went wrong' }
  }
}
type GetMasters = { city: number; begin: string; finish: string }
type CustomerRes = Response | { id: number; password: string }
type NewOrder = {
  service: number
  begin: string
  finish: string
  customer: number
  master: number
}
type UserResponse = { id: number; role: string; token: string; name: string }
type InitData = { city: City[] | []; service: Service[] | [] }
type OrderResponse = Response & { id: number }
type DataForLetter = {
  userEmail: string
  begin: string
  name: string
  city: string
  id: number
}

const getMasters = async ({ city, begin, finish }: GetMasters): Promise<Master[]> => {
  const res = await fetch(`${homePath}/find/${city}/${begin}/${finish}`)
  return res.json()
}

const upsertCustomer = async (data: Partial<Customer>): Promise<CustomerRes> => {
  const res = await fetch(`${homePath}/customer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const login = async (data: LocalSignIn): Promise<SignRes> => {
  const res = await fetch(`${homePath}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const add = async (data: NewOrder): Promise<OrderResponse> => {
  const res = await fetch(`${homePath}/newOrder`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const sendFirstLetter = async (data: DataForLetter): Promise<{ msg: string }> => {
  const res = await fetch(`${homePath}/confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const sendSecondLetter = async (data: DataForLetter): Promise<{ msg: string }> => {
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

const registr = async (data: LocalSignUp): Promise<UserResponse> => {
  const res = await fetch(`${homePath}/signUp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const payment = async (data: { id: string; amount: number }): Promise<Response> => {
  const res = await fetch(`${homePath}/handlePay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const googleUser = async (data: { token: string }): Promise<SignRes> => {
  const res = await fetch(`${homePath}/signInGoogle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}
const newGoogleUser = async (data: GoogleSignUp): Promise<SignRes> => {
  const res = await fetch(`${homePath}/signUpGoogle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const getPostsList = async (): Promise<Post[]> => {
  const res = await fetch(`${homePath}/getPostsList`)
  return res.json()
}
const onePost = async (data: { id: string }): Promise<Post> => {
  const res = await fetch(`${homePath}/getPost/${data.id}`)
  return res.json()
}

export const getFreeMasters = async (data: GetMasters) => await wrapTryCatch(getMasters(data))
export const getCustomer = async (data: Partial<Customer>) => await wrapTryCatch(upsertCustomer(data))
export const loginUser = async (data: LocalSignIn) => await wrapTryCatch(login(data))
export const addNewOrder = async (data: NewOrder) => await wrapTryCatch(add(data))
export const sendConfirmLetter = async (data: DataForLetter) => await wrapTryCatch(sendFirstLetter(data))
export const sendRatingLetter = async (data: DataForLetter) => await wrapTryCatch(sendSecondLetter(data))
export const getInit = async () => await wrapTryCatch(init())
export const checkUserAuth = async (token: string) => await wrapTryCatch(check(token))
export const regUser = async (data: LocalSignUp) => await wrapTryCatch(registr(data))
export const handlePayment = async (data: { id: string; amount: number }) => await wrapTryCatch(payment(data))
export const authGoogleUser = async (data: { token: string }) => await wrapTryCatch(googleUser(data))
export const regGoogleUser = async (data: GoogleSignUp) => await wrapTryCatch(newGoogleUser(data))
export const getPosts = async () => await wrapTryCatch(getPostsList())
export const getOnePost = async (data: { id: string }) => await wrapTryCatch(onePost(data))
