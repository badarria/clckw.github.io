import {
	addItem,
	updateItem,
	removeItem,
	getItems,
	getForeignKeys,
	getFilteredOrders,
} from './requests'
import {
	setItemsAction,
	setColumnsAction,
	pushToChangeAction,
	toggleStateAction,
	clearDataAction,
	changeOrdersHoursAction,
	setToastMsgAction, setLoadingAction,
} from './table-actions-selector'
import {emptyFields, mergeWithForeignKeys} from "./utils/table-func";
import {getHoursArray} from "./utils/date-time-func";


export const setToastMsg = (subj, msg, dispatch) => {
	dispatch(setToastMsgAction(subj, msg))
	setTimeout(() => {
		dispatch(setToastMsgAction(subj, ''))
	}, 2000)
}
export const setLoader = (subj, data, dispatch) => {
	dispatch(setLoadingAction(subj, data))
}

export const setItems = (subj) => async (dispatch) => {
	const data = await getItems(subj)
	dispatch(setItemsAction(subj, data));
}

export const setColumns = (subj, data) => (dispatch) => {
	dispatch(setColumnsAction(subj, data));
}

export const removeFromDB = (subj, id) => async (dispatch) => {
	setLoader(subj, true, dispatch);
	const res = await removeItem(id, subj);
	setLoader(subj, false, dispatch);
	if (res) {
		setToastMsg(subj, res, dispatch)
	}
	dispatch(setItems(subj))
}

export const pushToChange = (subj, data, state, getKeys = false) => async (dispatch) => {
	setLoader(subj, true, dispatch);
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
	setLoader(subj, false, dispatch)
}

export const cancelInput = (subj) => (dispatch) => {
	dispatch(toggleStateAction(subj, null))
	dispatch(clearDataAction(subj));
}

export const accept = (subj, data) => async (dispatch, getState) => {
	setLoader(subj, true, dispatch);
	const state = getState()[`${subj}`].editState;
	const res = state === 'isEditing' ? await updateItem(data, subj) : await addItem(data, subj);
	if (res) {
		await dispatch(cancelInput(subj, dispatch))
		await dispatch(setItems(subj))
		setToastMsg(subj, res, dispatch)
	}
	setLoader(subj, false, dispatch);
}

export const _getFreeHours = async (master_id, date, service_time, order_id = 0) => {
	const orders = await getFilteredOrders('orders', master_id, date, order_id)
	return getHoursArray(service_time, orders);
}

export const changeFreeHours = (subj, master_id, date, service_time, order_id) => async (dispatch) => {
	const newHours = await _getFreeHours(master_id, date, service_time, order_id);
	dispatch(changeOrdersHoursAction(subj, newHours))
}





