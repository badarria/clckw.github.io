import { IconButtonProps } from '@material-ui/core'
import { MouseEventHandler, ReactElement } from 'react'
import { Order, Master, Customer, City, Service, Paging } from '../../../types'

export type NewMaster = {
  id: number
  name: string
  surname: string
  city: string
  email: string
  password?: string
}

export type AllSubjectsData = City | Order | Master | Customer | ServiceWithKeys

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

export type ButtonIconProps = IconButtonProps & {
  title: string
  icon: ReactElement<IconButtonProps> | null
  onClick: MouseEventHandler<HTMLButtonElement>
  disabled: boolean
  type: string
}

export type AlertDialogProps = {
  icon: ReactElement<IconButtonProps> | null
  title: string
  accept: () => void
  question: string
  description: string
  disabled: boolean
  type: BtnType
}

export type BtnType = 'button' | 'submit' | 'reset'

export type ChartDate = { begin: string; finish: string }
export type Chart1 = ChartDate & { period: Period }
export type Chart2Res = { city: string; total: number }
export type Chart3Res = { master: string; total: number }
export type ServiceTypes = Record<string, number>
export type ServiceTypesKey = keyof ServiceTypes
export type Chart4 = ChartDate & { paging: Paging }
export type Chart4ResList = {
  types: ServiceTypes[]
  master: string
  orders: number
  iscompleted: number
  isnotcompleted: number
  price: number
  rating: number | null
}
export type Chart4Res = {
  list: Chart4ResList[]
  count: number
}

export type Chart4Init = { name: string }[]

export type Chart1Res = {
  day?: string
  month?: string
  week?: string
  orders: { city: string; count: number; master: string }[]
  total: number
}[]
export type Period = 'month' | 'week' | 'day'
export type Range = { begin: string; finish: string }
export type Chart1Init = { city: string; city_id: number; fullName: string; master_id: number }[]
