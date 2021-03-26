import { Redirect } from 'react-router-dom'
import { User } from '../types'
import { Master } from '../components/containers'

export const MasterRoute = ({ user }: { user: User; path: string }) => {
  const { auth, role, id, name } = user
  const isMaster = auth && role === 'master'

  return isMaster ? <Master id={id} name={name} /> : <Redirect to='/' />
}
