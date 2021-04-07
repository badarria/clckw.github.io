import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Box } from '@material-ui/core'
import { LoginForm } from './login-form'
import { useDispatch, useSelector } from 'react-redux'
import { useStyles } from './styles'
import { login, logout, registration } from '../../../services/home'
import { HeaderProps, LoginData, RegistrMasterData } from 'types'
import { RootState } from 'store'

export const Header = () => {
  const user = useSelector((state: RootState) => state.user)
  const { auth, role } = user
  const isAdmin = role === 'admin' && auth
  const isMaster = role === 'master' && auth
  const isCustomer = role === 'customer' && auth
  const { root, title, btns } = useStyles()
  const dispatch = useDispatch()
  const newMaster = useCallback((data: RegistrMasterData) => registration(data, dispatch), [])
  const logoutFrom = useCallback(() => logout(dispatch), [])
  const loginTo = useCallback((data: LoginData) => login(data, dispatch), [])

  const loginFormProps = { login: loginTo, registration: newMaster }

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
              <LoginForm {...loginFormProps} />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
