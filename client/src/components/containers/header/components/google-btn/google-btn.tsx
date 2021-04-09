import { Button } from '@material-ui/core'
import React from 'react'
import GoogleLogin from 'react-google-login'
import { SignUpGglBtnPrT } from '../../types'
import { useStyles } from './styles'
const clientId = '469901995859-e0ltg7q6mmppkqlc5rfvdvgr7ekup736.apps.googleusercontent.com'

const GoogleBtn = ({ cb, label }: SignUpGglBtnPrT) => {
  const { btnGoogle } = useStyles()

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText='Login'
      onSuccess={cb}
      onFailure={cb}
      cookiePolicy={'single_host_origin'}
      render={(renderProps) => (
        <Button
          variant='contained'
          color='primary'
          className={btnGoogle}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}>
          {label}
        </Button>
      )}
    />
  )
}

export default GoogleBtn
