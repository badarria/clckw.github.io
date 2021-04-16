import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Box } from '@material-ui/core'
import SignForm from './auth-form/sign-form'
import { useDispatch, useSelector } from 'react-redux'
import { useStyles } from './styles'
import { RootState } from 'store'
import { setUserAuth } from 'store/reducer'

export const Header = () => {
  const user = useSelector((state: RootState) => state.user)
  const isAdmin = user && user.role === 'admin'
  const isMaster = user && user.role === 'master'
  const isCustomer = user && user.role === 'customer'

  const { root, title, btns } = useStyles()
  const dispatch = useDispatch()

  const logoutFrom = useCallback(() => {
    localStorage.removeItem('token')
    dispatch(setUserAuth(null))
  }, [])

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
              <SignForm />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
