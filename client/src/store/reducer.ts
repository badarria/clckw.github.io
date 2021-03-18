import { createSlice } from '@reduxjs/toolkit'

export const initState = {
  newOrder: {},
  mailData: {},
  user: { id: 0, auth: true, role: '' },
  checking: true,
}

const rootReducer = createSlice({
  name: 'root',
  initialState: initState,
  reducers: {
    setNewOrder: (state, action) => {
      if (!Object.keys(action.payload).length) {
        state.newOrder = {}
      } else {
        state.newOrder = { ...state.newOrder, ...action.payload }
      }
    },
    setMailData: (state, action) => {
      state.mailData = { ...state.mailData, ...action.payload }
    },
    setUserAuth: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
    setChecking: (state, action) => {
      state.checking = action.payload
    },
  },
})

export const { reducer } = rootReducer
export const { setNewOrder, setMailData, setUserAuth, setChecking } = rootReducer.actions
