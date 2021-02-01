import React from 'react'
import { Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Box } from '@material-ui/core'
import { LoginForm } from './login-form/login-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getAuthState } from '../../../store/state-selectors'
import { useStyles } from './styles'
import { login, logout } from '../../../services/home'

const Header = ({ logout, login, isAuth }) => {
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
              <Button color='inherit' onClick={logout}>
                Logout
              </Button>
            ) : (
              <LoginForm {...{ login }} />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: getAuthState(state),
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout),
    login: (data) => dispatch(login(data)),
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(Header)
