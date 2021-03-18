import React from 'react'
import { Header, Home } from './containers'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getUserAuthState } from '../store/state-selectors'
import { AdminRoute, MasterRoute, RatingRoute } from '../routes'
import { Cities, Customers, Masters, Orders, Services } from './containers/admin/pages'
import { User } from 'types'

const App = (props) => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route exact path='/admin' render={() => <Redirect to='/admin/customers' />} />
        <AdminRoute path='/admin' user={props.user}>
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
        <MasterRoute path='/master' user={props.user} />
        <Redirect to='/' />
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state: { user: User }, ownProps: any = {}) => {
  return {
    user: getUserAuthState(state),
  }
}

export default compose(connect(mapStateToProps, null))(App)
