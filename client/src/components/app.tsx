import React from 'react'
import { Header } from './containers'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { AdminRoute, MasterRoute, RatingRoute, CustomerRoute, MastersRoute, PaymentRoute, BlogRoute } from '../routes'
import { Search, Blog } from '../components/containers/home/pages'
import { Cities, Customers, Masters, Orders, Services, Post } from './containers/admin/pages'
import { Loader } from './ui'

import { RootState } from 'store'
import { useSelector } from 'react-redux'

export const App = () => {
  const isChecking = useSelector((state: RootState) => state.checking)

  return (
    <Router>
      <Header />
      {isChecking ? (
        <Loader loading={isChecking} />
      ) : (
        <Switch>
          <Route path='/' exact component={Search} />
          <BlogRoute path='/blog' />
          <Route path='/freeMasters' exact component={MastersRoute} />
          <Route path='/payment' exact component={PaymentRoute} />
          <Route exact path='/admin' render={() => <Redirect to='/admin/customers' />} />
          <AdminRoute
            path='/admin'
            tabs={
              <Switch>
                <Route path='/admin/customers' exact component={Customers} />
                <Route path='/admin/masters' exact component={Masters} />
                <Route path='/admin/cities' exact component={Cities} />
                <Route path='/admin/services' exact component={Services} />
                <Route path='/admin/orders' exact component={Orders} />
                <Redirect from='/admin' to='/' />
              </Switch>
            }
            post={<Route path='/admin/post' exact component={Post} />}
          />
          <RatingRoute path='/orderRate' />
          <MasterRoute path='/master' />
          <CustomerRoute path='/customer' />
          <Redirect to='/' />
        </Switch>
      )}
    </Router>
  )
}
