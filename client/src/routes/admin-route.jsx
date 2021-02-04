import React from 'react'
import { Redirect } from 'react-router-dom'
import { Admin } from '../components/containers'

export const AdminRoute = ({ isAuth, children }) => {
  return isAuth ? (
    <>
      <Admin>{children}</Admin>
    </>
  ) : (
    <Redirect to='/' />
  )
}
