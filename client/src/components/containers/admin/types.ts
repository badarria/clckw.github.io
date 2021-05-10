import { IconButtonProps } from '@material-ui/core'
import { MouseEventHandler, ReactElement } from 'react'
import { Order, Master, Customer, City, Service } from '../../../types'

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


export type Chart1 = { begin: string; finish: string }
export type Chart1Res = { day: string, bymasters: { count: number, master: string }[], bycities: { city: string, count: number }[], total: number }[]