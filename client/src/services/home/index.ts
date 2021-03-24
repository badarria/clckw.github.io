import { setChecking, setUserAuth } from '../../store/reducer'
import { checkUserAuth, loginUser } from './api'
import { LoginData } from 'types'
import { Dispatch } from 'redux'

export const login = (data: LoginData) => async (dispatch: Dispatch) => {
  const res = await loginUser(data)
  if ('token' in res) {
    const { token, role, id } = res
    localStorage.setItem('token', token)
    dispatch(setUserAuth({ auth: true, role, id }))
    return { msg: 'success', role }
  } else {
    return res
  }
}

export const stayAuth = async (dispatch: Dispatch) => {
  const token = localStorage.getItem('token')
  if (token) {
    dispatch(setChecking(true))
    const res = await checkUserAuth(token)
    if (res && 'role' in res) {
      const { role, id } = res
      dispatch(setUserAuth({ auth: true, id, role }))
    } else {
      localStorage.removeItem('token')
      dispatch(setUserAuth({ auth: false }))
    }
  }
  dispatch(setChecking(false))
}

export const logout = (dispatch: Dispatch) => {
  localStorage.removeItem('token')
  dispatch(setUserAuth({ id: 0, auth: false, role: '' }))
}
