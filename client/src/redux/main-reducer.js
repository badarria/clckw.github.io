import {createSlice} from "@reduxjs/toolkit";

const initState = {
	formData: {
		name: '',
		surname: '',
		email: '',
		city: '',
		service: '',
		time: []
	},
	auth: false
};

const mainReducer = createSlice({
	name: 'main',
	initialState: initState,
	reducers: {
		setFormData: (state, action) => {
			console.log(action)
			state.formData = action.payload
		},
		setAuth: (state, action) => {
			state.auth = action.payload
		}
	}
})

export const {reducer, actions} = mainReducer;
export const {setFormData, setAuth} = mainReducer.actions