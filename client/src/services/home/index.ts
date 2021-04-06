import { LoginFormResponse } from './../../types/index'
import { setChecking, setUserAuth } from '../../store/reducer'
import { checkUserAuth, loginUser, regMaster } from './api'
import { LoginData, RegistrMasterData } from 'types'
import { Dispatch } from 'redux'

export const login = async (data: LoginData, dispatch: Dispatch): LoginFormResponse => {
  const res = await loginUser(data)
  if ('token' in res) {
    const { token, role, id, name } = res
    localStorage.setItem('token', token)
    dispatch(setUserAuth({ auth: true, role, id, name }))
    return { msg: 'success', role, name }
  } else {
    return res
  }
}

export const registration = async (data: RegistrMasterData, dispatch: Dispatch): LoginFormResponse => {
  const res = await regMaster(data)
  if ('token' in res) {
    const { token, role, id, name } = res
    localStorage.setItem('token', token)
    dispatch(setUserAuth({ auth: true, role, id, name }))
    return { msg: 'success', role, name }
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
      const { role, id, name } = res
      dispatch(setUserAuth({ auth: true, id, role, name }))
    } else {
      localStorage.removeItem('token')
      dispatch(setUserAuth({ auth: false }))
    }
  }
  dispatch(setChecking(false))
}

export const logout = (dispatch: Dispatch) => {
  localStorage.removeItem('token')
  dispatch(setUserAuth({ id: 0, auth: false, role: '', name: '' }))
}
