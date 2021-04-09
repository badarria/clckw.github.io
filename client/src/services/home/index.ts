import { setChecking, setUserAuth } from '../../store/reducer'
import { checkUserAuth } from './api'
import { Dispatch } from 'redux'

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

export const logout = (dispatch: Dispatch) => {}
