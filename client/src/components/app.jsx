import React from 'react'
import { Header, Home } from './containers'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getAuthState } from '../store/state-selectors'
import { AdminRoute, RatingRoute } from './routes'

const App = ({ isAuth }) => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <AdminRoute path='/admin' isAuth={isAuth} />
        <RatingRoute path='/orderRate' />
      </Switch>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: getAuthState(state),
  }
}

export default compose(connect(mapStateToProps, null))(App)
