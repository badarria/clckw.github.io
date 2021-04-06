import { createSlice } from '@reduxjs/toolkit'

export const initState = {
  orderData: {
    service: { id: 0, name: '', time: '', price: 0 },
    date: '',
    time: '',
    customer: 0,
    master: { id: 0, name: '', surname: '', rating: 0, fullName: '' },
    city: { id: 0, name: '' },
    files: [''],
  },
  customerData: { name: '', surname: '', email: '', id: 0 },
  mailData: { name: '', userEmail: '', city: '', begin: '', service: '', master: '', id: 0 },
  masters: [{ id: 0, name: '', surname: '', rating: 0, fullName: '' }],
  initState: { city: [{ id: 0, name: '' }], service: [{ id: 0, name: '', time: '' }] },
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
