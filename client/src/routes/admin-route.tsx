import React, { FC } from 'react'
import { Redirect } from 'react-router-dom'
import { User } from 'types'
import { Admin } from '../components/containers'

export const AdminRoute: FC<{ user: User; path: string }> = ({ user, children }) => {
  const { auth, role } = user

  return auth && role === 'admin' ? <Admin>{children}</Admin> : <Redirect to='/' />
}
