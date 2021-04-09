import React, { useState, useCallback } from 'react'
import { Dialog } from '@material-ui/core'
import { useStyles } from '../styles'
import { SignUpGglFormDtT, GglSignInDtT, SignUpDialogPrT } from '../../types'
import SignUpDialog1 from './sign-up-dialog-1'
import { GoogleBtn } from '../../components'
import SignUpDialog2 from './sign-up-dialog-2'

const SignUpDialog = ({ close, localSignUp, open, msg, gglSignUp, changeState }: SignUpDialogPrT) => {
  const { dialog } = useStyles()
  const [token, setToken] = useState('')

  const change = useCallback(() => changeState(true), [])

  const handleGg1 = (data: GglSignInDtT) => {
    if ('tokenId' in data) {
      const token = data.tokenId
      setToken(token)
    }
  }

  const handleGg2 = (data: SignUpGglFormDtT) => {
    const { master, city } = data
    gglSignUp({ token, isMaster: master, city })
  }

  const gglBtn = <GoogleBtn cb={handleGg1} label='Sign Up with Google' />

  const regDialog1Props = { gglBtn, change, msg, localSignUp }
  const regDialog2Props = { msg, change, submit: handleGg2 }

  return (
    <>
      <Dialog open={open} onClose={close} aria-labelledby='form-dialog-title' className={dialog}>
        {token ? <SignUpDialog2 {...regDialog2Props} /> : <SignUpDialog1 {...regDialog1Props} />}
      </Dialog>
    </>
  )
}

export default SignUpDialog
