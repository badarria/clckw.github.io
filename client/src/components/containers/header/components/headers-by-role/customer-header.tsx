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
      <Button color='inherit' component={Link} to={'/blog'} className={btns}>
        Blog
      </Button>
      <Box className={btns}>
        <Button color='inherit' component={Link} to={'/customer'}>
          Customer
        </Button>
        <LogoutBtn logout={logout} />
      </Box>
    </>
  )
}
