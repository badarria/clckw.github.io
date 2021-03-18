import { setUserAuth } from '../../store/reducer'
import { checkUserAuth, loginUser } from './api'
import { LoginData } from 'types'
import { Dispatch } from 'redux'

export const login = (data: LoginData) => async (dispatch: Dispatch) => {
  const res = await loginUser(data)
  if ('token' in res) {
    const { token, role, user_id } = res
    localStorage.setItem('token', token)
    dispatch(setUserAuth({ auth: true, role, id: user_id }))
    return { status: true, msg: 'Success', role }
  } else {
    return { status: false, msg: res }
  }
}

export const stayAuth = async (dispatch: Dispatch) => {
  const token = localStorage.getItem('token')
  if (token) {
    const res = await checkUserAuth(token)
    if (res && 'role' in res) {
      const { role, user_id } = res
      dispatch(setUserAuth({ auth: true, id: user_id, role }))
    } else {
      localStorage.removeItem('token')
      dispatch(setUserAuth({ auth: false }))
    }
  }
}

export const stayMasterAuth = async (dispatch: Dispatch) => {
  const userToken = localStorage.getItem('userToken')
  if (userToken) {
    const user = await checkUserAuth(userToken)
    if (user) {
      dispatch(setUserAuth(true))
    } else {
      localStorage.removeItem('userToken')
      dispatch(setUserAuth(false))
    }
  } else dispatch(setUserAuth(false))
}

export const logout = (dispatch: Dispatch) => {
  localStorage.removeItem('token')
  dispatch(setUserAuth({ id: 0, auth: false, role: '' }))
}
