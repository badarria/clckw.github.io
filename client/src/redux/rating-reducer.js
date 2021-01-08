import { createSlice } from '@reduxjs/toolkit'

export const initState = {
  loading: false,
  orderToRate: {},
  status: { rated: false, msg: 'Order already has been rated, thanks!' },
}

const ratingReducer = createSlice({
  name: 'rating',
  initialState: initState,
  reducers: {
    setLoader: (state, action) => {
      state.loading = action.payload
    },
    setOrderToRate: (state, action) => {
      state.orderToRate = action.payload
    },
    setStatus: (state, action) => {
      state.status = { ...state.status, ...action.payload }
    },
  },
})

export const { reducer } = ratingReducer
export const { setLoader, setOrderToRate, setStatus } = ratingReducer.actions
