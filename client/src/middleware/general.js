import {
	getColumnNames,
	addItem,
	updateItem,
	deleteItem,
	getItems,
	getForeignKeys,
	getBookedTime,
	getFilteredOrders
} from './requests'
import {
	setItemsAction,
	setColumnsAction,
	setDataToChangeAction,
	setErrorsAction,
	setHelperAction,
	pushToChangeAction,
	toggleStateAction,
	clearDataToChangeAction, changeHoursAction
} from './actions-selectors'
import {emptyFields, mergeWithForeignKeys} from "../utils/table";
import {findBookedTime, getHoursArray} from "../utils/func-for-timestamp";
import format from "date-fns/format";
import {parseISO} from "date-fns";

const getItemsThunk = (subj) => async (dispatch) => {
	const data = await getItems(subj)
	dispatch(setItemsAction(subj, data));
}
const setColumns = (subj, data, dispatch) => {
	dispatch(setColumnsAction(subj, data));
}

const getColumnsThunk = (subj) => async (dispatch) => {
	const data = await getColumnNames(subj);
	dispatch(setColumnsAction(subj, data));
}


const removeFromDB = (subj, dispatch) => async (id) => {
	await deleteItem(id, subj);
	await dispatch(getItemsThunk(subj))
}


const getFreeHours = async (master_id, date, service_time, order_id = 0) => {
	date = date.replace(/[a-z ]/g, '')
	const orders = await getFilteredOrders('orders', master_id, date, order_id)
	return getHoursArray(orders, service_time);
}

const changeFreeHours = (subj, dispatch) => async (master_id, date, service_time, order_id) => {
	const newHours = await getFreeHours(master_id, date, service_time, order_id);
	dispatch(changeHoursAction(subj, newHours))
}

const pushToChange = (subj, dispatch, getKeys = false) => async (data, state) => {
	const isEditing = state === 'isEditing'
	const foreignKeys = getKeys ? await getForeignKeys(subj) : {};
	let res = Array.isArray(data) ? emptyFields(data) : {...data}

	if (foreignKeys) {
		res = mergeWithForeignKeys(Object.entries(res), foreignKeys, isEditing);
	}
	if (subj === 'orders') {
		res.hours = [{hour: data.begin, booked: false}]
	}
	dispatch(pushToChangeAction(subj, res))
	dispatch(toggleStateAction(subj, state))
}

const cancelInput = (subj, dispatch) => () => {
	dispatch(clearDataToChangeAction(subj));
	dispatch(toggleStateAction(subj, null))
}

const acceptChanges = (subj, state, dispatch) => async (data) => {
	console.log(data, 'general')
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
	dispatch(setDataToChangeAction(subj, {[key]: value}))
	dispatch(setErrorsAction(subj, error))
}


export {
	getItemsThunk,
	getColumnsThunk,
	removeFromDB,
	setHelper,
	pushToChange,
	acceptChanges,
	handleChangeData,
	cancelInput,
	setColumns, changeFreeHours
}