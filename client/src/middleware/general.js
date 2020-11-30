import {getColumnNames, addItem, updateItem, deleteItem, getItems} from './requests'
import {
	getItemsAction,
	getColumnsAction,
	setDataToChangeAction,
	setErrorsAction,
	setHelperAction,
	pushToChangeAction,
	toggleStateAction,
	clearDataToChangeAction
} from './actions-selectors'
import {emptyFields, mergeWithForeignKeys} from "../utils/table";

const getItemsThunk = (subj) => async (dispatch) => {
	const data = await getItems(subj)
	dispatch(getItemsAction(subj, data));
}

const getColumnsThunk = (subj) => async (dispatch) => {
	const data = await getColumnNames(subj);
	dispatch(getColumnsAction(subj, data));
}


const removeFromDB = (subj, dispatch) => async (id) => {
	await deleteItem(id, subj);
	await dispatch(getItemsThunk(subj))
}

const pushToChange = (subj, dispatch, keys = {}) => (data, state) => {
	let res = Array.isArray(data) ? emptyFields(data) : data
	if (Object.keys(keys).length) {
		res = mergeWithForeignKeys(Object.entries(res), keys);
	}
	dispatch(pushToChangeAction(subj, res))
	dispatch(toggleStateAction(subj, state))
}

const cancelInput = (subj, dispatch) => () => {
	dispatch(clearDataToChangeAction(subj));
	dispatch(toggleStateAction(subj, null))
}

const acceptChanges = (subj, state, dispatch) => async (data) => {
	state === 'isEditing' ? await updateItem(data, subj) : await addItem(data, subj);
	await dispatch(getItemsThunk(subj))
	await dispatch(cancelInput(subj, dispatch))
}

const setHelper = (subj, columns, helperText, dispatch) => {
	const helper = columns.reduce((acc, column) => {
		acc[column] = helperText(column)
		return acc
	}, {});
	dispatch(setHelperAction(subj, helper))
}

const handleChangeData = (subj, dispatch, errorCases) => (key, value) => {
	const error = {[key]: errorCases(key, value)}
	// const helper = {[key]: helperText(key)}
	console.log(subj, error)
	dispatch(setDataToChangeAction(subj, {[key]: value}))
	dispatch(setErrorsAction(subj, error))
	// dispatch(setHelperAction(subj, helper))
}


export {
	getItemsThunk,
	getColumnsThunk,
	removeFromDB,
	setHelper,
	pushToChange,
	acceptChanges,
	handleChangeData,
	cancelInput
}