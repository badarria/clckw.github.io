import React from 'react'
import { Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Box } from '@material-ui/core'
import { LoginForm } from './login-form'
import { Action, compose } from 'redux'
import { connect } from 'react-redux'
import { getUserAuthState } from '../../../store/state-selectors'
import { useStyles } from './styles'
import { login, logout, registration } from '../../../services/home'
import { HeaderProps, LoginData, RegistrMasterData, User } from 'types'
import { ThunkDispatch } from '@reduxjs/toolkit'

const Header = ({ logoutFrom, loginTo, user, newMaster }: HeaderProps) => {
  const { auth, role } = user
  const isAdmin = role === 'admin' && auth
  const isMaster = role === 'master' && auth
  const isCustomer = role === 'customer' && auth
  const { root, title, btns } = useStyles()

  return (
    <AppBar position='static'>
      <Container>
        <Toolbar className={root}>
          <Button component={Link} to={'/'} className={title}>
            Clockware
          </Button>
          <Box className={btns}>
            {isAdmin && (
              <Button color='inherit' component={Link} to={'/admin/customers'}>
                Admin
              </Button>
            )}
            {isMaster && (
              <Button color='inherit' component={Link} to={'/master'}>
                Master
              </Button>
            )}
            {isCustomer && (
              <Button color='inherit' component={Link} to={'/customer'}>
                Customer
              </Button>
            )}
            {isAdmin || isMaster || isCustomer ? (
              <Button color='inherit' onClick={logoutFrom}>
                Logout
              </Button>
            ) : (
              <LoginForm {...{ login: loginTo, registration: newMaster }} />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

const mapStateToProps = (state: { user: User }) => {
  return {
    user: getUserAuthState(state),
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => {
  return {
    logoutFrom: () => dispatch(logout),
    loginTo: (data: LoginData) => dispatch(login(data)),
    newMaster: (data: RegistrMasterData) => dispatch(registration(data)),
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(Header)
