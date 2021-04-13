import { createSlice } from '@reduxjs/toolkit'
type InitState = {
  user: { id: number; auth: boolean; role: string; name: string } | null,
  masters: { id: number; name: string; surname: string; rating: number; fullName: string }[],
  mailData: {
    name: string
    userEmail: string
    city: string
    begin: string
    service: string
    master: string
    id: number
  } | null,
  orderData: {
    service: { id: number; name: string; time: string; price: number }
    date: string
    time: string
    customer: number
    master: { id: number; name: string; surname: string; rating: number; fullName: string }
    city: { id: number; name: string }
    files: string[]
  } | null,
  customerData: { name: string; surname: string; email: string; id: number } | null,
  initState: { city: [{ id: number; name: string }]; service: [{ id: number; name: string; time: string }] } | null,
  checking: boolean
}

export const initState: InitState = {
  orderData: null,
  customerData: null,
  mailData: null,
  masters: [],
  initState: null,
  user: null,
  checking: true,
}

const rootReducer = createSlice({
  name: 'root',
  initialState: initState,
  reducers: {
    setUserAuth: (state, action) => {
      if (action.payload) {
        state.user = { ...state.user, ...action.payload }
      } else state.user = null
    },
    setChecking: (state, action) => {
      state.checking = action.payload
    },
    setInitState: (state, action) => {
      state.initState = action.payload
    },
    setOrderData: (state, action) => {
      state.orderData = { ...state.orderData, ...action.payload }
    },
    setMailData: (state, action) => {
      state.mailData = { ...state.mailData, ...action.payload }
    },
    setCustomerData: (state, action) => {
      state.customerData = { ...state.customerData, ...action.payload }
    },
    setMasters: (state, action) => {
      state.masters = action.payload
    },
    setInit: (state) => {
      state.customerData = initState.customerData
      state.orderData = initState.orderData
      state.masters = []
      state.mailData = initState.mailData
    },
  },
})

export const { reducer } = rootReducer
export const {
  setUserAuth,
  setChecking,
  setMasters,
  setMailData,
  setOrderData,
  setInitState,
  setCustomerData,
  setInit,
} = rootReducer.actions
