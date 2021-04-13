import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { RootState } from 'store'
import { Admin } from '../components/containers'

export const AdminRoute: FC<{ path: string }> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user)

  return user && user.role === 'admin' ? <Admin>{children}</Admin> : <Redirect to='/' />
}
