import { createSlice } from '@reduxjs/toolkit'

export const initState = {
  newOrder: {},
  mailData: {},
  isAuth: true,
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
    setAuth: (state, action) => {
      state.isAuth = action.payload
    },
  },
})

export const { reducer } = rootReducer
export const { setAuth, setNewOrder, setMailData } = rootReducer.actions
