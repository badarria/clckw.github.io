export type UserOrders = {
  id: number
  m: { fullName: string }
  c: { fullName: string; email: string }
  s: { service: string; price: number }
  begin: string
  finish: string
  rating: number
  date: string
  completed: boolean
}

export type OrdersList = {
  id: number
  master: string
  service: string
  date: string
  begin: string
  finish: string
  rating: number
  completed: boolean
}
