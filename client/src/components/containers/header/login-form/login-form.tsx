import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useStyles } from './styles'
import { Loader } from '../../../ui'
import { RegistrationDialog, LoginDialog } from '.'
import { LoginData, LoginFormProps } from 'types'
import { Button } from '@material-ui/core'

export const LoginForm = ({ login, registration }: LoginFormProps) => {
  const { btn } = useStyles()
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLogin, setLoginState] = useState(true)
  const { state } = useLocation<{ from: string }>()
  const history = useHistory()

  const submitLogin = async (data: LoginData) => {
    setLoading(true)
    const res = await login(data)

    if ('role' in res) {
      setLoading(false)
      close()
      let path = '/admin/customers'
      res.role === 'customer' && (path = '/customer')
      res.role === 'master' && (path = '/master')
      history.push(state?.from || path)
    } else {
      setMsg(res.msg)
      setLoading(false)
      setTimeout(() => {
        setMsg('')
      }, 2000)
    }
  }

  const submitRegistration = async (data) => {
    setLoading(true)
    const res = await registration({ ...data, city: data.city.id })
    if ('role' in res) {
      setLoading(false)
      close()
      let path = '/master'
      history.push(state?.from || path)
    } else {
      setMsg(res.msg)
      setLoading(false)
      setTimeout(() => {
        setMsg('')
      }, 2000)
    }
  }

  const setRegistration = (isLogin) => {
    setLoginState(isLogin)
  }

  const handleClickOpen = () => setOpen(true)

  const close = () => {
    setLoginState(true)
    setOpen(false)
  }

  const loginProps = { msg, open, close, submit: submitLogin, changeState: setRegistration }
  const registrationProps = { msg, open, close, submit: submitRegistration, changeState: setRegistration }

  return (
    <>
      <Loader loading={loading} />
      <Button color='inherit' className={btn} onClick={handleClickOpen}>
        Login
      </Button>
      {isLogin ? <LoginDialog {...loginProps} /> : <RegistrationDialog {...registrationProps} />}
    </>
  )
}
