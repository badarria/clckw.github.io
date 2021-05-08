import React, { useCallback } from 'react'
import { Container, AppBar, Toolbar } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useStyles } from './styles'
import { RootState } from 'store'
import { setUserAuth } from 'store/reducer'
import { CustomerHeader, MasterHeader, AdminHeader, NoRoleHeader } from './components'

export const Header = () => {
  const user = useSelector((state: RootState) => state.user)
  const isAdmin = user && user.role === 'admin'
  const isMaster = user && user.role === 'master'
  const isCustomer = user && user.role === 'customer'
  const noRole = !isAdmin && !isMaster && !isCustomer

  const { root } = useStyles()
  const dispatch = useDispatch()

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    dispatch(setUserAuth(null))
  }, [])

  return (
    <AppBar position='static'>
      <Container>
        <Toolbar className={root}>
          {isAdmin && <AdminHeader logout={logout} />}
          {isCustomer && <CustomerHeader logout={logout} />}
          {isMaster && <MasterHeader logout={logout} />}
          {noRole && <NoRoleHeader />}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
