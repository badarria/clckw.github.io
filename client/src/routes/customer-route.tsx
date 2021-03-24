import { Redirect } from 'react-router-dom'
import { User } from '../types'
import { Customer } from '../components/containers'

export const CustomerRoute = ({ user }: { user: User; path: string }) => {
  const { auth, role, id } = user
  const isCustomer = auth && role === 'customer'

  return isCustomer ? <Customer id={id} /> : <Redirect to='/' />
}
