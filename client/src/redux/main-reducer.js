import {createSlice} from "@reduxjs/toolkit";

const initState = {
	formData: {
		name: '',
		surname: '',
		email: '',
		city: '',
		service: '',
		date: '',
		hours: ''
	},
	freeMasters: [],
	msg: '',
	newOrder: {},
	isAuth: false
};

const mainReducer = createSlice({
	name: 'main',
	initialState: initState,
	reducers: {
		setFormData: (state, action) => {
			state.formData = action.payload
		},
		setWorkingHours: (state, action) => {
			state.formData.hours = action.payload
		},
		setFreeMasters: (state, action) => {
			state.freeMasters = action.payload
		},
		setMasterMessage: (state, action) => {
			state.msg = action.payload
		},
		setNewOrder: (state, action) => {
			state.newOrder = action.payload
		},
		setAuth: (state, action) => {
			state.isAuth = action.payload
		},
	}
})

export const {reducer} = mainReducer;
export const {setFormData, setAuth, setWorkingHours, setFreeMasters, setMasterMessage, setNewOrder} = mainReducer.actions