import React from 'react'
import { Button } from '@material-ui/core'
import { useStyles } from '../../auth-form/styles'
import FacebookAuth from 'react-facebook-auth'
import { FacebookBtnPrT } from '../../types'

const FacebookBtn = ({ cb }: FacebookBtnPrT) => {
  const { btnGoogle } = useStyles()
  const btn = ({ onClick }) => (
    <Button className={btnGoogle} onClick={onClick} variant='contained' color='primary'>
      Sign in with Facebook
    </Button>
  )

  return <FacebookAuth appId='495294944977053' callback={cb} component={btn} />
}

export default FacebookBtn
