import { Redirect, Route } from 'react-router-dom'
import { Master } from '../components/containers'
import { RootState } from 'store'
import { useSelector } from 'react-redux'

export const MasterRoute = ({ path }: { path: string }) => {
  const { auth, role } = useSelector((state: RootState) => state.user)
  const isMaster = auth && role === 'master'

  return isMaster ? <Master /> : <Redirect to='/' />
}
