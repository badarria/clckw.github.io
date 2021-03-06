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

// export type ChartDate = { begin: string; finish: string }
export type Histogram = Range & { period: Period }
export type DiagramByCitiesRes = { city: string; total: number }
export type DiagramByMastersRes = { master: string; total: number }
export type ServiceTypes = Record<string, number>
export type TableByMasters = Range & { paging: Paging }
export type TableByMastersList = {
  types: ServiceTypes[]
  master: string
  orders: number
  iscompleted: number
  isnotcompleted: number
  price: number
  rating: number | null
}
export type TableByMastersRes = {
  list: TableByMastersList[]
  count: number
}

export type TableByMastersInit = { name: string }[]

export type HistogramRes = {
  day?: string
  month?: string
  week?: string
  orders: { city: string; count: number; master: string }[]
  total: number
}[]
export type Period = 'month' | 'week' | 'day'
export type Range = { begin: string | null; finish: string | null }
export type HistogramInit = { cities: string[]; masters: string[] }
export type UserByText = { id: number; fullName: string }

export type DataItem = City | Service | (Master & { fullName: string }) | { id: number; name: string }
export type SelectFilterProps = {
  changeOptions: (value: number[]) => void
  selected: number[]
  data: DataItem[]
  label: string
  keyWord?: keyof City | keyof Service | keyof (Master & { fullName: string })
}
export type FilterQuery = {
  masters?: number[]
  cities?: number[]
  services?: number[]
  begin?: string
  finish?: string
  completed?: boolean[]
}
export type GetOrders = Paging & FilterQuery
