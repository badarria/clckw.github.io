import { Control } from 'react-hook-form'
import { IconButtonProps } from '@material-ui/core'
import { FormEvent, ReactElement } from 'react'

export type Master = {
  id: number
  name: string
  surname: string
  ci: City
  rating: number
}

export type Order = {
  id: number
  m: { fullName: string; id: number }
  c: { fullName: string; id: number }
  s: { service: string; id: number; service_time: string }
  begin: string
  finish: string
  rating: number
  date: string
  city: string
}
export type OrderWithDisabled = Order & { disabled: boolean }
export type Service = { id: number; name: string; time: string }
export type ServiceWithKeys = Service & {
  time: { id: number; name: string; time: string }[]
  time_id: number
}
export type Customer = {
  id: number
  name: string
  surname: string
  email: string
}

export type City = {
  id: number
  name: string
}

export type AllSubjectsData = City | Order | Master | Customer | Service
export type AllSubjectsDataUi = City | OrderWithDisabled | Master | Customer | ServiceWithKeys
///Subjects List
export type MastersList = { items: Master[]; count: number }
export type CustomersList = { items: Customer[]; count: number }
export type CitiesList = { items: City[]; count: number }
export type OrdersList = { items: Order[]; count: number }
export type ServicesList = { items: Service[]; count: number }

export type Method = 'POST' | 'PUT'
export type Paging = {
  limit: number
  order: 'desc' | 'asc' | undefined
  orderby: string
  offset: number
  count: number
}
export type SelectKey = { id: number; name: string }
export type FilterParams = { master_id: number; order_id: number; date: string }
export type RawFilterParams = FilterParams & { service_time: string }

export type FilteredOrders = { begin: string; finish: string }[]
export type deleteData = number

export type MastersKey = City[]
export type OrdersKey = {
  master: { id: number; fullName: string }[]
  customer: { id: number; fullName: string }[]
  service: { id: number; service: string; service_time: string }[]
}
export type ServicesKey = { time: { id: number; name: string }[] }
export type HoursArray = { hour: string; booked: boolean }[]
export type State = 'isEditing' | 'isCreating' | null

type SubjFormProps = { cancel: Function; accept: Function }

export type TypicalResponse = { type: 'success' | 'info' | 'warning' | 'error'; msg: string }
export type CustomersFormProps = SubjFormProps & { data: Customer }
export type CitiesFormProps = SubjFormProps & { data: City }
export type ServicesFormProps = SubjFormProps & { data: Service }
export type MastersFormProps = SubjFormProps & { data: Master }
export type OrdersFormProps = SubjFormProps & { data: Omit<Order, 'rating' | 'city' | 'finish'> }
export type initOrderKeys = {
  customer: { id: number; fullName: string }[]
  service: { id: number; service: string; service_time: string }[]
  master: { id: number; fullName: string }[]
}
export type NewOrderData = {
  id: number
  master: number
  customer: number
  service: number
  begin: string
  finish: string
}
export type SubmittedOrder = {
  customer: { id: number; fullName: string }
  service: { id: number; service: string; service_time: string }
  master: { id: number; fullName: string }
  hours: string
  date: Date
  id: number
}
export type OrderToReq = {
  customer_id: number
  service_id: number
  master_id: number
  hours: string
  id: string
  begin: string
  finish: string
}

export type DataForNewOrder = {
  service_id: number
  begin: string
  finish: string
  customer_id: number
  master_id: number
}

export type AutocompleteFieldProps = {
  data: any[]
  control: Control
  name: string
  keyToSelect: string
  errors: any
}

export type InputFieldProps = { defaultValue: string; label: string; register: any; errors: any }
export type ToastProps = { toast: TypicalResponse }

export type SelectHoursProps = {
  control: Control<any>
  data: { hour: string; booked: boolean }[]
  name: string
  disabled: boolean
}

export type LoaderProps = { loading: boolean }
export type DatePickerProps = { control: Control }

export type TableFormProps = { submit: { (event: FormEvent<HTMLFormElement>): void }; reset: Function }

export type AdminTableHeadProps = {
  columns: string[]
  push: Function
  order: 'desc' | 'asc' | undefined
  orderby: string
  setChange: Function
}
export type AdminTableListProps = {
  remove: Function
  data: Array<AllSubjectsDataUi>
  columns: string[]
  editState: State
  push: Function
}
export type AdminTableProps = {
  items: Array<AllSubjectsDataUi>
  columns: string[]
  remove: Function
  push: Function
  editState: State
  toast: TypicalResponse
  header: ReactElement
  pagination: ReactElement
}

export type AlertDialogProps = {
  icon: ReactElement<IconButtonProps> | null
  title: string
  accept: Function
  question: string
  description: string
  disabled: boolean
  type: string
}
export type PaginationProps = { option: { limit: number; offset: number; count: number }; setPaging: Function }

export type ButtonIconProps = IconButtonProps & {
  title: string
  icon: ReactElement<IconButtonProps> | null
  onClick: Function
  disabled: boolean
  type: string
}

export type LoginData = { login: string; password: string }

export type MailResponse = { msg: string }

export type CustomerResponse = TypicalResponse | number
export type FreeMastersList = Master[]
export type LoginResponse = { token: string } | TypicalResponse
export type DataToProcess = {
  service: Service
  city: City
  hours: string
  date: Date
  email: string
  name: string
  surname: string
}

export type InitData = { city: City[] | []; service: Service[] | [] }

export type InitFields = InitData & {
  name: string
  surname: string
  email: string
}

export type OrderResponse = TypicalResponse & { id: number }
export type DataForLetter = {
  userEmail: string
  begin: string
  name: string
  city: string
  orderId: number
}

export type ParamsForSearching = { city: number; begin: string; finish: string }
export type RawParamsForSearching = {
  date: Date
  hours: string
  name: string
  surname: string
  email: string
  city: {
    id: number
    name: string
  }
  service: {
    id: number
    name: string
    time: string
  }
}

export type MasterCardProps = {
  id: number
  name: string
  surname: string
  rating: number
  confirm: Function
  key: number
}
export type MastersListProps = { data: FreeMastersList; confirm: Function }
