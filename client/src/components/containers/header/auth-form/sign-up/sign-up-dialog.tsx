import React, { useState, useCallback } from 'react'
import { Dialog } from '@material-ui/core'
import { useStyles } from '../styles'
import { SignUpGoogleForm, GoogleSignIn, SignUpDialogProps } from '../../types'
import SignUpDialog1 from './sign-up-dialog-1'
import { GoogleBtn } from '../../components'
import SignUpDialog2 from './sign-up-dialog-2'

const SignUpDialog = ({ close, localSignUp, open, msg, googleSignUp, changeState }: SignUpDialogProps) => {
  const { dialog } = useStyles()
  const [token, setToken] = useState('')

  const change = useCallback(() => changeState(true), [])

  const handleGoogleStage1 = (data: GoogleSignIn) => {
    if ('tokenId' in data) {
      const token = data.tokenId
      setToken(token)
    }
  }

  const handleGoogleStage2 = (data: SignUpGoogleForm) => {
    const { master, city } = data
    googleSignUp({ token, isMaster: master, city })
  }

  const gglBtn = <GoogleBtn cb={handleGoogleStage1} label='Sign Up with Google' />

  const regDialog1Props = { gglBtn, change, msg, localSignUp }
  const regDialog2Props = { msg, change, submit: handleGoogleStage2 }

  return (
    <>
      <Dialog open={open} onClose={close} aria-labelledby='form-dialog-title' className={dialog}>
        {token ? <SignUpDialog2 {...regDialog2Props} /> : <SignUpDialog1 {...regDialog1Props} />}
      </Dialog>
    </>
  )
}

export default SignUpDialog
