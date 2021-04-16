import { PaymentMethodResult } from '@stripe/stripe-js'

export type BtnType = 'button' | 'submit' | 'reset'

export type Paging = {
  limit?: number
  order?: 'desc' | 'asc'
  orderby?: string
  offset?: number
  count?: number
}

export type Response = { type: 'success' | 'info' | 'warning' | 'error'; msg: string }

export type StripeFunc = (email: string, name: string, surname: string) => Promise<PaymentMethodResult>

export type Master = {
  id: number
  name: string
  surname: string
  ci: City
  rating: number
  email: string
  password?: string
}

export type ServiceAsKey = { id: number; service: string; service_time: string }

export type Order = {
  id: number
  m: { fullName: string; id: number }
  c: { fullName: string; id: number }
  s: ServiceAsKey
  begin: string
  finish: string
  rating: number
  date: string
  city: string
  status: string
}

export type Service = { id: number; name: string; time: string; price: number }

export type Customer = {
  id: number
  name: string
  surname: string
  email: string
  password: string
}

export type City = {
  id: number
  name: string
}
