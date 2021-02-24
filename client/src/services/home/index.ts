import { setAuth } from '../../store/reducer'
import { checkAuth, loginUser } from './api'

import { LoginData } from 'types'
import { Dispatch } from 'redux'

export const login = (data: LoginData) => async (dispatch: Dispatch) => {
  const res = await loginUser(data)
  if ('token' in res) {
    localStorage.setItem('token', res.token)
    dispatch(setAuth(true))
    return { status: true, msg: 'Success' }
  } else {
    dispatch(setAuth(false))
    return { status: false, msg: res }
  }
}

export const stayAuth = async (dispatch: Dispatch) => {
  const token = localStorage.getItem('token')
  if (token) {
    const isAuth = await checkAuth(token)
    if (isAuth) {
      dispatch(setAuth(true))
    } else {
      localStorage.removeItem('token')
      dispatch(setAuth(false))
    }
  } else dispatch(setAuth(false))
}

export const logout = (dispatch: Dispatch) => {
  localStorage.removeItem('token')
  dispatch(setAuth(false))
}
