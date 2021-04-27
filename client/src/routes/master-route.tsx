import React from 'react'
import { Redirect } from 'react-router-dom'
import { RootState } from 'store'
import { useSelector } from 'react-redux'

export const MasterRoute: React.FunctionComponent<any> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user)
  const isMaster = user && user.role === 'master'

  if (!isMaster) return <Redirect to='/' />
  return children
}
