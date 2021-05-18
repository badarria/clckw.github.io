import React from 'react'
import { Header } from './containers'
import { Scheduler, MasterMainPage } from './containers/master/pages'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { AdminRoute, MasterRoute, RatingRoute, CustomerRoute, MastersRoute, PaymentRoute, BlogRoute } from '../routes'
import { Search } from '../components/containers/home/pages'
import { Cities, Customers, Masters, Orders, Services, Post, Statistic } from './containers/admin/pages'
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
          <Route
            path='/admin'
            render={() => (
              <AdminRoute
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
                statistic={<Route path='/admin/statistic' exact component={Statistic} />}
              />
            )}
          />
          <RatingRoute path='/orderRate' />

          <MasterRoute path='/master'>
            <Switch>
              <Route path='/master' exact component={MasterMainPage} />
              <Route path='/master/scheduler' exact component={Scheduler} />
              <Redirect from='/master' to='/' />
            </Switch>
          </MasterRoute>
          <Route path='/customer' exact component={CustomerRoute} />
          <Redirect to='/' />
        </Switch>
      )}
    </Router>
  )
}
