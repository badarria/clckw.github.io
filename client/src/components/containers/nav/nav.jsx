import React from 'react'
import { Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Box } from '@material-ui/core'
import { LoginForm } from '../../ui'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getAuthState } from '../../../store/selectors/state-selectors'
import { login, logout } from '../../../services/home'
import { useStyles } from './styles'

const Nav = ({ logout, login, isAuth }) => {
  const { root, title, btns } = useStyles()
  const formProps = { login, isAuth }

  return (
    <AppBar position='static'>
      <Container>
        <Toolbar className={root}>
          <Button component={Link} to={'/'} className={title}>
            Clockware
          </Button>
          <Box className={btns}>
            {isAuth ? (
              <Button color='inherit' component={Link} to={'/admin'}>
                Admin
              </Button>
            ) : null}
            {isAuth ? (
              <Button color='inherit' onClick={logout}>
                Logout
              </Button>
            ) : (
              <LoginForm {...formProps} />
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(Nav)
