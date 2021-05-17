import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Box } from '@material-ui/core'
import { useStyles } from '../../styles'
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
        <Button color='inherit' component={Link} to={'/admin/post'}>
          Add new post
        </Button>
        <Button color='inherit' component={Link} to={'/admin/statistic'}>
          Statistic
        </Button>
      </Box>
      <Box className={btns}>
        <Button color='inherit' component={Link} to={'/admin/customers'}>
          Admin
        </Button>
        <LogoutBtn logout={logout} />
      </Box>
    </>
  )
}
