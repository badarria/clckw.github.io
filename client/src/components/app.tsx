import React from 'react'
import { Header, Home } from './containers'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getCheckingState, getUserAuthState } from '../store/state-selectors'
import { AdminRoute, MasterRoute, RatingRoute } from '../routes'
import { Cities, Customers, Masters, Orders, Services } from './containers/admin/pages'
import { User } from 'types'
import { Loader } from './ui'

const App = ({ user, isChecking }) => {
  return (
    <Router>
      <Header />
      {isChecking ? (
        <Loader loading={isChecking} />
      ) : (
        <Switch>
          <Route path='/' exact component={Home} />
          <Route exact path='/admin' render={() => <Redirect to='/admin/customers' />} />
          <AdminRoute path='/admin' user={user}>
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
          <MasterRoute path='/master' user={user} />
          <Redirect to='/' />
        </Switch>
      )}
    </Router>
  )
}

const mapStateToProps = (state: { user: User; checking: boolean }, ownProps: any = {}) => {
  return {
    user: getUserAuthState(state),
    isChecking: getCheckingState(state),
  }
}

export default compose(connect(mapStateToProps, null))(App)
