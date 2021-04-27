import React, { useCallback } from 'react'
import { Dialog, DialogContent, DialogTitle, Button, Box } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { Typography } from '@material-ui/core'
import { loginForm } from '../../../../../services/home/validation/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useStyles } from '../styles'
import { GoogleBtn } from '../../components'
import { LocalSignIn, GoogleSignIn } from '../../types'
import { InputField } from 'components/ui'

type Props = {
  msg: string
  open: boolean
  close: () => void
  localSignIn: (data: LocalSignIn) => void
  googleSignIn: (data: GoogleSignIn) => void
  changeState: (data: boolean) => void
}

const SignInDialog = ({ close, open, msg, changeState, googleSignIn, localSignIn }: Props) => {
  const { dialog, title, signInForm, content, btnWrap, btn, msgBox } = useStyles()

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginForm),
  })

  const registration = useCallback(() => changeState(false), [])
  const inputProps = { register, errors }

  return (
    <Dialog open={open} onClose={close} aria-labelledby='form-dialog-title' className={dialog}>
      <DialogTitle id='form-dialog' className={title}>
        Login
      </DialogTitle>
      <DialogContent className={content}>
        <form onSubmit={handleSubmit(localSignIn)} className={signInForm} autoComplete='off'>
          <Box className={btnWrap}>
            <InputField label='email' {...inputProps} />
            <InputField label='password' {...inputProps} type='password' />
            <Box className={msgBox}>
              {msg ? (
                <Typography color='secondary' variant='subtitle2'>
                  {msg}
                </Typography>
              ) : null}
            </Box>
          </Box>
          <Box className={btnWrap}>
            <Button type='submit' color='primary' variant='contained' className={btn}>
              Ok
            </Button>
            <GoogleBtn cb={googleSignIn} label='Sign in with Google' />
            <Button size='small' onClick={registration} className={btn} variant='outlined'>
              register
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SignInDialog
