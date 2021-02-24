import React, {FC} from 'react'
import { Redirect } from 'react-router-dom'
import { Admin } from '../components/containers'

export const AdminRoute: FC<{isAuth: boolean, path:string}> = ({ isAuth, children }) => {
  return isAuth ? (
    <>
      <Admin>{children}</Admin>
    </>
  ) : (
    <Redirect to='/' />
  )
}
