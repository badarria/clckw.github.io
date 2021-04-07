import React from 'react'
import { Header } from './containers'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { AdminRoute, MasterRoute, RatingRoute, CustomerRoute, MastersRoute } from '../routes'
import { Cities, Customers, Masters, Orders, Services } from './containers/admin/pages'
import { Loader } from './ui'

import { RootState } from 'store'
import { useSelector } from 'react-redux'
import { PaymentRoute, SearchRoute } from 'routes'

export const App = () => {
  const isChecking = useSelector((state: RootState) => state.checking)

  return (
    <Router>
      <Header />
      {isChecking ? (
        <Loader loading={isChecking} />
      ) : (
        <Switch>
          <Route path='/' exact component={SearchRoute} />
          <Route path='/freeMasters' exact component={MastersRoute} />
          <Route path='/payment' exact component={PaymentRoute} />
          <Route exact path='/admin' render={() => <Redirect to='/admin/customers' />} />
          <AdminRoute path='/admin'>
            <Switch>
              <Route path='/admin/customers' exact component={Customers} />
              <Route path='/admin/masters' exact component={Masters} />
              <Route path='/admin/cities' exact component={Cities} />
              <Route path='/admin/services' exact component={Services} />
              <Route path='/admin/orders' exact component={Orders} />
              <Redirect from='/admin' to='/' />
            </Switch>
          </AdminRoute>
          <RatingRoute path='/orderRate' />
          <MasterRoute path='/master' />
          <CustomerRoute path='/customer' />
          <Redirect to='/' />
        </Switch>
      )}
    </Router>
  )
}
