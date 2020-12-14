import {createSlice} from "@reduxjs/toolkit";

const initState = {
	formData: {
		name: '',
		surname: '',
		email: '',
		city: '',
		service: '',
		date: new Date(),
		hours: ''
	},
	freeMasters: [],
	auth: false
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
		setAuth: (state, action) => {
			state.auth = action.payload
		},
	}
})

export const {reducer} = mainReducer;
export const {setFormData, setAuth, setWorkingHours, setFreeMasters} = mainReducer.actions