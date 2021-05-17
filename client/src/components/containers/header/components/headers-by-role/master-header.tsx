import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Box } from '@material-ui/core'
import { useStyles } from './styles'
import { LogoBtn, LogoutBtn } from '..'

type Props = { logout: () => void }

export default ({ logout }: Props) => {
  const { btns } = useStyles()

  return (
    <>
      <LogoBtn />
      <Box className={btns}>
        <Button color='inherit' component={Link} to={'/blog'} className={btns}>
          Blog
        </Button>
      </Box>
      <Box className={btns}>
        <Button color='inherit' component={Link} to={'/master/scheduler'}>
          Calendar
        </Button>
        <Button color='inherit' component={Link} to={'/master'}>
          Master
        </Button>
        <LogoutBtn logout={logout} />
      </Box>
    </>
  )
}
