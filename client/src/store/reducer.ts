import { createSlice } from '@reduxjs/toolkit'
type User = { id: number; auth: boolean; role: string; name: string } | null
type Masters = { id: number; name: string; surname: string; rating: number; fullName: string }[]
type MailData = {
  name: string
  userEmail: string
  city: string
  begin: string
  service: string
  master: string
  id: number
} | null
type orderData = {
  service: { id: number; name: string; time: string; price: number }
  date: string
  time: string
  customer: number
  master: { id: number; name: string; surname: string; rating: number; fullName: string }
  city: { id: number; name: string }
  files: string[]
} | null
type customerData = { name: string; surname: string; email: string; id: number } | null
type initState = { city: [{ id: number; name: string }]; service: [{ id: number; name: string; time: string }] } | null

export const initState = {
  orderData: null as orderData,
  customerData: null as customerData,
  mailData: null as MailData,
  masters: [] as Masters,
  initState: null as initState,
  user: null as User,
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
