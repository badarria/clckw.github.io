export type ChangeStatus = { userEmail: string; name: string; id: number }

export type OrdersList = {
  id: number
  customer: string
  userEmail: string
  service: string
  price: number
  date: string
  finish: string
  begin: string
  rating: number
  completed: boolean
  photos: Photo[]
}

export type Photo = { id: number; url: string; order_id: number; public_id: string; resource_type: string }
