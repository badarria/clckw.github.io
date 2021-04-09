import React, { useCallback, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useStyles } from './styles'
import { Loader } from '../../../ui'
import {
  LocalSignInDtT,
  GglSignInDtT,
  UserStateDtT,
  SignInResDtT,
  GglSignUpDtT,
  LocalSignUpDtT,
  FbResDtT,
} from '../types'
import { Button } from '@material-ui/core'
import { authGoogleUser, loginUser, regGoogleUser, regUser, signInFbUser } from 'services/home/api'
import { useDispatch } from 'react-redux'
import { setUserAuth } from 'store/reducer'
import SignUpDialog from './sign-up/sign-up-dialog'
import SignInDialog from './sign-in/sign-in-dialog'

const SignForm = () => {
  const { btn } = useStyles()
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignIn, setSignInState] = useState(true)
  const { state } = useLocation<{ from: string }>()
  const history = useHistory()
  const dispatch = useDispatch()

  const handleSignInRes = (data: SignInResDtT) => {
    if ('token' in data) {
      const { token, role, id, name } = data
      localStorage.setItem('token', token)
      dispatch(setUserAuth({ auth: true, role, id, name }))
      return { msg: 'success', role, name }
    } else {
      return data
    }
  }

  const handleUserRole = (data: UserStateDtT) => {
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
  const handler = (res: SignInResDtT) => {
    const userState = handleSignInRes(res)
    handleUserRole(userState)
  }

  const handleLocalSignIn = async (data: LocalSignInDtT) => {
    setLoading(true)
    const res = await loginUser(data)
    handler(res)
  }

  const handleGglSignIn = async (data: GglSignInDtT) => {
    if ('tokenId' in data) {
      setLoading(true)
      const res = await authGoogleUser({ token: data.tokenId })
      handler(res)
    } else setMsg('Something went wrong. Try to login with local password.')
  }

  const localSignUp = async (data: LocalSignUpDtT) => {
    setLoading(true)
    const res = await regUser(data)
    handler(res)
  }

  const gglSignUp = async (data: GglSignUpDtT) => {
    setLoading(true)
    const res = await regGoogleUser(data)
    handler(res)
  }

  // const fbSignIn = async (data: FbResDtT) => {
  //   setLoading(true)
  //   const res = await signInFbUser(data)
  //   handler(res)
  // }

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
    gglSignIn: handleGglSignIn,
  }
  const signUpDialogRr = { msg, open, close, localSignUp, gglSignUp, changeState: setSignState }

  return (
    <>
      <Loader loading={loading} />
      <Button color='inherit' className={btn} onClick={handleClickOpen}>
        Login
      </Button>
      {isSignIn ? <SignInDialog {...signInDialogPr} /> : <SignUpDialog {...signUpDialogRr} />}
    </>
  )
}

export default SignForm
