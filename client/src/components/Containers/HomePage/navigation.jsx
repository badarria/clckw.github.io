import React from 'react'
import { Link } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Box } from '@material-ui/core'
import { LoginForm } from './login-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getAuthState } from '../../../middleware/state-selectors'
import { login, logout } from '../../../middleware/home/home-client-thunks'
import { useNavStyles } from '../../styles/styles'

const Navigation = ({ logout, login, isAuth }) => {
  const classes = useNavStyles()
  const formProps = { login, isAuth }

  return (
    <AppBar position='static'>
      <Container>
        <Toolbar className={classes.root}>
          <Button component={Link} to={'/'} className={classes.title}>
            Clockware
          </Button>
          <Box className={classes.buttons}>
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(Navigation)
