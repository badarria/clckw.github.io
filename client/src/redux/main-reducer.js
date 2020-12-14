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
		setAuth: (state, action) => {
			state.auth = action.payload
		}
	}
})

export const {reducer} = mainReducer;
export const {setFormData, setAuth, setWorkingHours} = mainReducer.actions