import { useLocation, useHistory, Link } from 'react-router-dom'
import { Dialog, DialogContent, DialogTitle, Button, Box, TextField } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { Typography } from '@material-ui/core'
import { loginForm } from '../../../../services/home/validation/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useStyles } from './styles'
import { useState } from 'react'

type DialogProps = {
  msg: string
  open: boolean
  close: () => void
  submit: ({ email, password }: { email: string; password: string }) => void
  changeState: (boolean) => void
}

export const LoginDialog = ({ close, submit, open, msg, changeState }: DialogProps) => {
  const { dialog, title, form, content, fields, btnWrap, btn } = useStyles()

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginForm),
  })

  return (
    <Dialog open={open} onClose={close} aria-labelledby='form-dialog-title' className={dialog}>
      <DialogTitle id='form-dialog' className={title}>
        Login
      </DialogTitle>
      <DialogContent className={content}>
        <form onSubmit={handleSubmit(submit)} className={form}>
          <Box className={btnWrap}>
            <TextField
              autoFocus
              id='name'
              label='Email*'
              name='email'
              type='text'
              autoComplete='nope'
              inputRef={register}
              className={fields}
              error={!!errors.email}
              helperText={errors.email?.message || ''}
            />
            <TextField
              id='password'
              label='Password*'
              name='password'
              type='password'
              autoComplete='nope'
              inputRef={register}
              className={fields}
              error={!!errors.password}
              helperText={errors.password?.message || ''}
            />
            {msg ? (
              <Typography color='secondary' variant='subtitle2'>
                {msg}
              </Typography>
            ) : null}
          </Box>
          <Box className={btnWrap}>
            <Button type='submit' color='primary' variant='contained' className={btn}>
              Ok
            </Button>
            <Button size='small' onClick={() => changeState(false)} className={btn}>
              register as a master
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}
