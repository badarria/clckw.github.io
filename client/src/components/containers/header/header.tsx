import React from 'react'
import { Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Box } from '@material-ui/core'
import { LoginForm } from './login-form/login-form'
import { Action, compose } from 'redux'
import { connect } from 'react-redux'
import { getAuthState } from '../../../store/state-selectors'
import { useStyles } from './styles'
import { login, logout } from '../../../services/home'
import { LoginData } from 'types'
import { ThunkDispatch } from '@reduxjs/toolkit'

const Header = ({
  logoutFrom,
  loginTo,
  isAuth,
}: {
  logoutFrom: () => void
  loginTo: (data: LoginData) => Promise<any>
  isAuth: boolean
}) => {
  const { root, title, btns } = useStyles()

  return (
    <AppBar position='static'>
      <Container>
        <Toolbar className={root}>
          <Button component={Link} to={'/'} className={title}>
            Clockware
          </Button>
          <Box className={btns}>
            {isAuth && (
              <Button color='inherit' component={Link} to={'/admin/customers'}>
                Admin
              </Button>
            )}
            {isAuth ? (
              <Button color='inherit' onClick={logoutFrom}>
                Logout
              </Button>
            ) : (
              <LoginForm {...{ login: loginTo }} />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

const mapStateToProps = (state: { isAuth: boolean }) => {
  return {
    isAuth: getAuthState(state),
  }
}
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, Action>) => {
  return {
    logoutFrom: () => dispatch(logout),
    loginTo: (data: LoginData) => dispatch(login(data)),
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(Header)
