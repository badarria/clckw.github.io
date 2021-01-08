import { Redirect, Route } from 'react-router-dom'
import { AdminPage } from '../../Containers/AdminPage/admin-page'
import React from 'react'

export const AdminPageRoute = ({ component: Comp, path, isAuth, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return isAuth ? <AdminPage {...props} /> : <Redirect to={{ pathname: '/', state: { from: path } }} />
      }}
    />
  )
}
