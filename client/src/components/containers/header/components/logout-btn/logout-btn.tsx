import React from 'react'
import { Button } from '@material-ui/core'

type Props = { logout: () => void }

export default ({ logout }: Props) => {
  return (
    <Button color='inherit' onClick={logout}>
      Logout
    </Button>
  )
}
