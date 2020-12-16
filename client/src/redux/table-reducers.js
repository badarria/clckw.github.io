import {createSlice} from "@reduxjs/toolkit";

const initState = () => ({
	list: null,
	columns: null,
	dataToChange: {},
	editState: null,
	errors: {},
	helper: null,
});


export const createTableReducers = (subj) => {
	const {reducer, actions} = createSlice({
		name: subj,
		initialState: initState(subj),
		reducers: {
			[`get${subj}List`]: (state, action) => {
				state.list = action.payload
			},
			[`get${subj}Columns`]: (state, action) => {
				state.columns = action.payload
			},
			[`set${subj}State`]: (state, action) => {
				state.editState = action.payload
			},
			[`set${subj}Errors`]: (state, action) => {
				state.errors = {...state.errors, ...action.payload};
			},
			[`set${subj}Helper`]: (state, action) => {
				state.helper = {...state.helper, ...action.payload};
			},
			[`toggle${subj}EditState`]: (state, action) => {
				state.editState = action.payload;
			},
			[`push${subj}ToChange`]: (state, action) => {
				state.dataToChange = action.payload;
			},
			[`clear${subj}DataToChange`]: (state, action) => {
				state.dataToChange = {};
			},
			[`change${subj}FreeHours`]: (state, action) => {
				state.dataToChange.hours = action.payload;
			}
		}
	})
	return {reducer: reducer, actions: actions}
}




