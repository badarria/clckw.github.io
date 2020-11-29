import {createSlice} from "@reduxjs/toolkit";
import {getColumnNames, addItem, updateItem, deleteItem, getItems} from '../middleware/requests'

const initState = (subj) => ({
	list: null,
	columns: null,
	dataToChange: null,
	editState: null,
	errors: null,
	helper: null,
});


export const createTableReducers = (name) => {
	const {reducer, actions} = createSlice({
		name: name,
		initialState: initState(name),
		reducers: {
			[`get${name}List`]: (state, action) => {
				state.list = action.payload
			},
			[`get${name}Columns`]: (state, action) => {
				state.columns = action.payload
			},
			[`set${name}DataToChange`]: (state, action) => {
				state.dataToChange = action.payload
			},
			[`set${name}State`]: (state, action) => {
				state.editState = action.payload
			},
			[`set${name}ErrorHelper`]: (state, action) => {
				state.errors = action.payload.errors;
				state.helper = action.payload.helper;
			}
		}
	})
	return {reducer: reducer, actions: actions}
}

