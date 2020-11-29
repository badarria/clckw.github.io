import {createSlice} from "@reduxjs/toolkit";

const initState = {list: null};

const citiesReducer = createSlice({
	name: 'cities',
	initialState: initState,
	reducers: {
		addCitiesList:(state, action) => {
			state.list = action.payload
		},
		changeDataToSearch:(state, action) => {
			state.dataToChange = action.payload
		}
	}
})

export const {reducer} = citiesReducer;
export const {addCitiesList, changeDataToSearch} = citiesReducer.actions;