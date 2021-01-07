import { createSlice } from "@reduxjs/toolkit";

export const initState = {
  formData: {
    name: "",
    surname: "",
    email: "",
    city: "",
    service: "",
    date: "",
    hours: "",
  },
  freeMasters: [],
  newOrder: {},
  mailData: {},
  toast: { type: "success", msg: "" },
  loading: false,
  isAuth: false,
};

const homeReducer = createSlice({
  name: "home",
  initialState: initState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setWorkingHours: (state, action) => {
      state.formData.hours = action.payload;
    },
    setFreeMasters: (state, action) => {
      state.freeMasters = action.payload;
    },
    setNewOrder: (state, action) => {
      if (!Object.keys(action.payload).length) {
        state.newOrder = {};
      } else {
        state.newOrder = {
          ...state.newOrder,
          ...action.payload,
        };
      }
    },
    setMailData: (state, action) => {
      state.mailData = { ...state.mailData, ...action.payload };
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setToastMsg: (state, action) => {
      state.toast = action.payload;
    },
    setLoader: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { reducer } = homeReducer;
export const {
  setFormData,
  setAuth,
  setWorkingHours,
  setFreeMasters,
  setNewOrder,
  setToastMsg,
  setLoader,
  setMailData,
} = homeReducer.actions;
