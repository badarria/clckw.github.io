export type ChangeStatus = { userEmail: string; name: string; id: number }

export type Photo = { id: number; url: string; order_id: number; public_id: string; resource_type: string }

export type Columns = Array<keyof List>

export type List = {
  id: number
  customer: string
  email: string
  begin: string
  finish: string
  date: string
  completed: boolean
  rating: number
  photos: string
  service: string
  price: number
  receipt: string
}

export type UserOrders = {
  list: List[]
  count: number
}
