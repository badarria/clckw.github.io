import {
	getColumnNames,
	addItem,
	updateItem,
	deleteItem,
	getItems,
	getForeignKeys,
	getFilteredOrders,
	getFreeMasters
} from './requests'
import {
	setItemsAction,
	setColumnsAction,
	setHelperAction,
	pushToChangeAction,
	toggleStateAction,
	clearDataAction,
	changeOrdersHoursAction,
	setFormDataAction,
	setHoursAction,
	setAuthAction, setFreeMastersAction
} from './actions-selectors'
import {emptyFields, mergeWithForeignKeys} from "../utils/table-func";
import {dateString, dateTimeString, getHoursArray} from "../utils/date-time-func";
// import {setFormDataAction, setAuth} from "../redux/main-reducer"

const getItemsThunk = (subj) => async (dispatch) => {
	const data = await getItems(subj)
	dispatch(setItemsAction(subj, data));
}

const setColumns = (subj, data) => (dispatch) => {
	dispatch(setColumnsAction(subj, data));
}

const getColumnsThunk = (subj) => async (dispatch) => {
	const data = await getColumnNames(subj);
	dispatch(setColumnsAction(subj, data));
}

const removeFromDB = (subj, id) => async (dispatch) => {
	await deleteItem(id, subj);
	dispatch(getItemsThunk(subj))
}

const pushToChange = (subj, data, state, getKeys = false) => async (dispatch) => {
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

const cancelInput = (subj) => (dispatch) => {
	dispatch(clearDataAction(subj));
	dispatch(toggleStateAction(subj, null))
}

const accept = (subj, data) => async (dispatch, getState) => {
	const state = getState()[`${subj}`].editState;
	state === 'isEditing' ? await updateItem(data, subj) : await addItem(data, subj);
	await dispatch(getItemsThunk(subj))
	await dispatch(cancelInput(subj, dispatch))
}

const setHelper = (subj, columns, helperText) => (dispatch) => {
	const helper = columns.reduce((acc, column) => {
		acc[column] = helperText(column)
		return acc
	}, {});
	dispatch(setHelperAction(subj, helper))
}

const _getFreeHours = async (master_id, date, service_time, order_id = 0) => {
	date = date.replace(/[a-z ]/g, '')
	const orders = await getFilteredOrders('orders', master_id, date, order_id)
	return getHoursArray(orders, service_time);
}

const changeFreeHours = (subj, master_id, date, service_time, order_id) => async (dispatch) => {
	const newHours = await _getFreeHours(master_id, date, service_time, order_id);
	dispatch(changeOrdersHoursAction(subj, newHours))
}

const changeHours = (service_time) => (dispatch) => {
	const newHours = getHoursArray(service_time);
	dispatch(setHoursAction(newHours))
}

/////Main Page///

const getInitState = async (dispatch, getState) => {
	const city = await getItems('cities');
	const service = await getItems('services');
	const hours = getHoursArray(service.time);
	const formData = Object.entries(getState().main.formData);
	const keys = {city, service}
	const res = mergeWithForeignKeys(formData, keys)
	res.hours = hours
	dispatch(setFormDataAction(res))
}

const findMasters = (data) => async (dispatch) => {
	console.log(data)
	const {city, date, hours, service, name, surname, email} = data
	const normDate = dateString(date)
	const {begin, end} = dateTimeString(normDate, hours, service.time)
	const masters = await getFreeMasters(city.id, begin, end)
	const newCustomer = await addItem({name, surname, email}, 'customers');
	console.log(newCustomer)
	dispatch(setFreeMastersAction(masters))
	console.log(masters)
}

// const findCustomer = (data) => async (dispatch) => {
//
// }

export {
	getItemsThunk,
	getColumnsThunk,
	removeFromDB,
	setHelper,
	pushToChange,
	accept,
	cancelInput,
	setColumns, changeFreeHours,
	getInitState,
	changeHours,
	findMasters
}