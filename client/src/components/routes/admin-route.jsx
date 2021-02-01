import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Admin } from '../containers'
import { Cities, Customers, Masters, Orders, Services } from '../containers/admin/pages'

export const AdminRoute = ({ isAuth }) => {
  return isAuth ? (
    <>
      <Redirect from='/admin' to='/admin/customers' />
      <Admin>
        <Switch>
          <Route path='/admin/customers' exact component={Customers} />
          <Route path='/admin/masters' exact component={Masters} />
          <Route path='/admin/cities' exact component={Cities} />
          <Route path='/admin/services' exact component={Services} />
          <Route path='/admin/orders' exact component={Orders} />
        </Switch>
      </Admin>
    </>
  ) : (
    <Redirect to='/' />
  )
}
