import React, { useCallback, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useStyles } from './styles'
import { Loader } from '../../../ui'
import { LocalSignIn, GoogleSignIn, SignRes, GoogleSignUp, LocalSignUp } from '../types'
import { Response } from '../../../../types'
import { Button } from '@material-ui/core'
import { authGoogleUser, loginUser, regGoogleUser, regUser } from 'services/home/api'
import { useDispatch } from 'react-redux'
import { setUserAuth } from 'store/reducer'
import SignUpDialog from './sign-up/sign-up-dialog'
import SignInDialog from './sign-in/sign-in-dialog'
import { useTranslation } from 'react-i18next'

export type UserState = { msg: string; role: string; name: string } | Response

const SignForm = () => {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignIn, setSignInState] = useState(true)
  const { state } = useLocation<{ from: string }>()
  const history = useHistory()
  const dispatch = useDispatch()
  const { t } = useTranslation('header')

  const handleSignInRes = (data: SignRes) => {
    if ('token' in data) {
      const { token, role, id, name } = data
      localStorage.setItem('token', token)
      dispatch(setUserAuth({ auth: true, role, id, name }))
      return { msg: 'success', role, name }
    } else {
      return data
    }
  }

  const handleUserRole = (data: UserState) => {
    if ('role' in data) {
      setLoading(false)
      close()
      let path = '/admin/customers'
      data.role === 'customer' && (path = '/customer')
      data.role === 'master' && (path = '/master')
      history.push(state?.from || path)
    } else {
      setMsg(data.msg)
      setLoading(false)
      setTimeout(() => {
        setMsg('')
      }, 2000)
    }
  }
  const handler = (res: SignRes) => {
    const userState = handleSignInRes(res)
    handleUserRole(userState)
  }

  const handleLocalSignIn = async (data: LocalSignIn) => {
    setLoading(true)
    const res = await loginUser(data)
    handler(res)
  }

  const handleGoogleSignIn = async (data: GoogleSignIn) => {
    if ('error' in data && data.details.match('Cookie')) {
      return setMsg(t('form.cookiesMsg'))
    }
    if ('tokenId' in data) {
      setLoading(true)
      const res = await authGoogleUser({ token: data.tokenId })
      handler(res)
    } else setMsg(t('form.googleErrMsg'))
  }

  const localSignUp = async (data: LocalSignUp) => {
    setLoading(true)
    const res = await regUser(data)
    handler(res)
  }

  const googleSignUp = async (data: GoogleSignUp) => {
    setLoading(true)
    const res = await regGoogleUser(data)
    handler(res)
  }

  const setSignState = (isLogin: boolean) => {
    setSignInState(isLogin)
  }

  const handleClickOpen = useCallback(() => setOpen(true), [])

  const close = useCallback(() => {
    setSignInState(true)
    setOpen(false)
  }, [])

  const signInDialogPr = {
    msg,
    open,
    close,
    localSignIn: handleLocalSignIn,
    changeState: setSignState,
    googleSignIn: handleGoogleSignIn,
  }
  const signUpDialogProps = {
    msg,
    open,
    close,
    localSignUp,
    googleSignUp,
    changeState: setSignState,
  }

  return (
    <>
      <Loader loading={loading} />
      <Button color='inherit' onClick={handleClickOpen}>
        {t('login')}
      </Button>
      {isSignIn ? <SignInDialog {...signInDialogPr} /> : <SignUpDialog {...signUpDialogProps} />}
    </>
  )
}

export default SignForm
