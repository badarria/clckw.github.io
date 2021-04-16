import { Order, Master, Customer, City, Service } from '../../../types'

export type newMaster = {
  id: number
  name: string
  surname: string
  city: string
  email: string
  password?: string
}

export type AllSubjectsData = City | Order | Master | Customer | Service
export type AllSubjectsDataUi = City | Order | Master | Customer | ServiceWithKeys

export type ServiceWithKeys = Service & {
  time: { id: number; name: string; time: string }[]
  time_id: number
}

export type Method = 'POST' | 'PUT'
export type State = 'isEditing' | 'isCreating' | null

export type NewOrder = {
  id: number
  master: number
  customer: number
  service: number
  begin: string
  finish: string
}
