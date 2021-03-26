import { createSlice } from '@reduxjs/toolkit'

export const initState = {
  user: { id: 0, auth: true, role: '', name: '' },
  checking: true,
}

const rootReducer = createSlice({
  name: 'root',
  initialState: initState,
  reducers: {
    setUserAuth: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
    setChecking: (state, action) => {
      state.checking = action.payload
    },
  },
})

export const { reducer } = rootReducer
export const { setUserAuth, setChecking } = rootReducer.actions
