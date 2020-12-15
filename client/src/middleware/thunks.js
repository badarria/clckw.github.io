import {
	addItem,
	updateItem,
	removeItem,
	getItems,
	getForeignKeys,
	getFilteredOrders,
	getFreeMasters, loginUser, stayAuth, getCustomer
} from './requests'
import {
	setItemsAction,
	setColumnsAction,
	pushToChangeAction,
	toggleStateAction,
	clearDataAction,
	changeOrdersHoursAction,
	setFormDataAction,
	setHoursAction,
	setAuthAction, setFreeMastersAction, setNewOrderAction
} from './actions-selectors'
import {emptyFields, mergeWithForeignKeys} from "../utils/table-func";
import {getHoursArray} from "../utils/date-time-func";
import {subjects} from "../components/Containers/init-params";


export const setItems = (subj) => async (dispatch) => {
	const data = await getItems(subj)
	dispatch(setItemsAction(subj, data));
}

export const setColumns = (subj, data) => (dispatch) => {
	dispatch(setColumnsAction(subj, data));
}

export const removeFromDB = (subj, id) => async (dispatch) => {
	await removeItem(id, subj);
	dispatch(setItems(subj))
}

export const pushToChange = (subj, data, state, getKeys = false) => async (dispatch) => {
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

export const cancelInput = (subj) => (dispatch) => {
	dispatch(toggleStateAction(subj, null))
	dispatch(clearDataAction(subj));
}

export const accept = (subj, data) => async (dispatch, getState) => {
	const state = getState()[`${subj}`].editState;
	state === 'isEditing' ? await updateItem(data, subj) : await addItem(data, subj);
	await dispatch(cancelInput(subj, dispatch))
	await dispatch(setItems(subj))
}

export const _getFreeHours = async (master_id, date, service_time, order_id = 0) => {
	const orders = await getFilteredOrders('orders', master_id, date, order_id)
	return getHoursArray(service_time, orders);
}

export const changeFreeHours = (subj, master_id, date, service_time, order_id) => async (dispatch) => {
	const newHours = await _getFreeHours(master_id, date, service_time, order_id);
	dispatch(changeOrdersHoursAction(subj, newHours))
}

export const changeHours = (service_time) => (dispatch) => {
	const newHours = getHoursArray(service_time);
	dispatch(setHoursAction(newHours))
}

/////Main Page///
export const getInitState = async (dispatch, getState) => {
	const city = await getItems('cities');
	const service = await getItems('services');
	const hours = getHoursArray(service.time);
	const formData = Object.entries(getState().main.formData);
	const keys = {city, service}
	const res = mergeWithForeignKeys(formData, keys)
	res.hours = hours
	dispatch(setFormDataAction(res))
}

export const getAdminInitState = async (dispatch) => {
	subjects.forEach(([subj, columns]) => {
		dispatch(setItems(subj));
		dispatch(setColumns(subj, columns))
	})
}

export const setOrderData = (data) => (dispatch) => {
	dispatch(setNewOrderAction(data))
}

export const findMasters = ({city, begin, end}) => async (dispatch) => {
	const masters = await getFreeMasters(city, begin, end)
	dispatch(setFreeMastersAction(masters))
}

export const checkCustomer = ({name, surname, email}) => async (dispatch, getState) => {
	let id = await getCustomer(email);
	if (id.length) {
		id = id[0].id
	} else {
		const newCustomer = await addItem({name, surname, email}, 'customers');
		id = newCustomer.id
	}
	const order = {...getState().main.newOrder}
	order.customer = id
	dispatch(setOrderData(order))
}

export const acceptOrder = (id) => async (dispatch, getState) => {
	const order = {...getState().main.newOrder}
	order.master = id
	dispatch(setOrderData(order))
	const data = {...getState().main.newOrder}
	await addItem(data, 'orders')
	console.log('done')
}

export const login = (data) => async (dispatch) => {
	const res = await loginUser(data)
	if (res.token) {
		localStorage.setItem("token", res.token)
		dispatch(setAuthAction(true));
		dispatch(getAdminInitState)
	}
}

export const checkAuth = async (dispatch) => {
	const res = await stayAuth()
	dispatch(setAuthAction(res === true))
}

export const logout = (dispatch) => {
	localStorage.removeItem("token");
	dispatch(setAuthAction(false));
}



