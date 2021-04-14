import { Control, ErrorOption, FieldErrors, Ref, RegisterOptions } from 'react-hook-form'
import { IconButtonProps } from '@material-ui/core'
import { FormEvent, ReactElement } from 'react'

export type Master = {
  id: number
  name: string
  surname: string
  ci: City
  rating: number
  email: string
  password?: string
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
  status: string
}
export type UsersOrder = {
  id: number
  m: { fullName: string }
  c: { fullName: string; email: string }
  s: { service: string; price: number }
  begin: string
  finish: string
  rating: number
  date: string
  completed: boolean
  photos: Photo[]
}
export type UsersOrdersList = {
  id: number
  master: string
  service: string
  completed: boolean
  begin: string
  date: string
  finish: string
  rating: number
}
export type getUsersOrderData = Paging & { id: number }

export type Service = { id: number; name: string; time: string; price: number }
export type ServiceWithKeys = Service & {
  time: { id: number; name: string; time: string }[]
  time_id: number
}
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

export type AllSubjectsData = City | Order | Master | Customer | Service
export type AllSubjectsDataUi = City | Order | Master | Customer | ServiceWithKeys
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

type SubjFormProps = { cancel: Function; accept: Function; editState: State }

export type TypicalResponseType = { type: 'success' | 'info' | 'warning' | 'error'; msg: string }
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
export type ChangeStatus = { userEmail: string; name: string; id: number }
export type DataForNewOrder = {
  service: number
  begin: string
  finish: string
  customer: number
  master: number
}

export type AutocompleteFieldProps = {
  data: any[]
  control: Control
  name: string
  keyToSelect: string
  errors: any
  defValue?: any
}

export type InputPropsType = {
  label: string
  register: any
  errors: FieldErrors
  name?: string
  type?: string
}
export type ToastProps = { toast: TypicalResponseType }

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
export type MasterTableHeadProps = {
  columns: string[]
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
export type Photo = { id: number; url: string; order_id: number; public_id: string; resource_type: string }
export type MasterOrdersList = {
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
export type CustomerOrdersList = {
  id: number
  master: string
  service: string
  date: string
  finish: string
  begin: string
  rating: number
  completed: boolean
}

export type CustomerTableListProps = {
  data: CustomerOrdersList[]
  columns: string[]
  change: ({ id, rating }: { id: number; rating: number }) => void
}
export type AdminTableProps = {
  items: Array<AllSubjectsDataUi>
  columns: string[]
  remove: Function
  push: Function
  editState: State
  toast: TypicalResponseType
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

export type MailResponse = { msg: string }

export type CustomerResponse = TypicalResponseType | { id: number; password: string }
export type FreeMastersList = Master[]

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

export type OrderResponse = TypicalResponseType & { id: number }
export type DataForLetter = {
  userEmail: string
  begin: string
  name: string
  city: string
  id: number
}

export type ParamsForSearching = { city: number; begin: string; finish: string }
export type SubmitData = {
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
  files: any[]
}

export type MasterCardProps = {
  data: { id: number; name: string; surname: string; rating: number }
  confirm: Function
}

export type MastersListProps = { data: FreeMastersList }
export type User = { id: 0; auth: boolean; role: string; name: string }
export type UserResponse = { id: number; role: string; token: string; name: string }
