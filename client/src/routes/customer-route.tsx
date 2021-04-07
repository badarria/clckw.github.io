import { Redirect, Route } from 'react-router-dom'
import { Customer } from '../components/containers'
import { RootState } from 'store'
import { useSelector } from 'react-redux'

export const CustomerRoute = ({ path }: { path: string }) => {
  const { auth, role } = useSelector((state: RootState) => state.user)
  const isCustomer = auth && role === 'customer'

  return isCustomer ? <Route path={path} exact component={Customer} /> : <Redirect to='/' />
}
