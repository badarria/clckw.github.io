import React from 'react'
import { Nav } from './containers'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getAuthState } from '../store/selectors/state-selectors'
import { RatingPage, AdminPage, HomePage } from './pages'

const App = ({ isAuth }) => {
  return (
    <Router>
      <Nav />
      <Switch>
        <HomePage path='/' exact />
        <AdminPage path='/admin' exact isAuth={isAuth} />
        <RatingPage />
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
