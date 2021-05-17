import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Box } from '@material-ui/core'
import SignForm from '../../auth-form/sign-form'
import { useStyles } from './styles'
import { LogoBtn } from '..'

export default () => {
  const { btns } = useStyles()

  return (
    <>
      <LogoBtn />
      <Button color='inherit' component={Link} to={'/blog'} className={btns}>
        Blog
      </Button>
      <Box className={btns}>
        <SignForm />
      </Box>
    </>
  )
}
