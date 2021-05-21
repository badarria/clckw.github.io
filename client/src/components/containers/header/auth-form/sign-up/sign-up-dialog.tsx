import React, { useState, useCallback } from 'react'
import { Dialog } from '@material-ui/core'
import { useStyles } from '../styles'
import { SignUpGoogleForm, GoogleSignIn, GoogleSignUp, LocalSignUp } from '../../types'
import SignUpDialog1 from './sign-up-dialog-1'
import { GoogleBtn } from '../../components'
import SignUpDialog2 from './sign-up-dialog-2'
import { useTranslation } from 'react-i18next'

type Props = {
  msg: string
  open: boolean
  close: () => void
  googleSignUp: ({ token, isMaster, city }: GoogleSignUp) => void
  localSignUp: (data: LocalSignUp) => void
  changeState: (data: boolean) => void
}

const SignUpDialog = ({ close, localSignUp, open, msg, googleSignUp, changeState }: Props) => {
  const { dialog } = useStyles()
  const [token, setToken] = useState('')
  const { t } = useTranslation('header')
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

  const googleBtn = <GoogleBtn cb={handleGoogleStage1} label={t('form.signUpGoogle')} />

  const regDialog1Props = { googleBtn, change, msg, localSignUp }
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
