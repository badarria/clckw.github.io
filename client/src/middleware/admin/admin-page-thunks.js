import {
	addItem,
	updateItem,
	removeItem,
	getItems,
	getForeignKeys,
	getFilteredOrders,
} from './admin-requests'
import {
	setItemsAction,
	setColumnsAction,
	setDataToChangeAction,
	toggleStateAction,
	changeOrdersHoursAction,
	setToastMsgAction, setLoadingAction, setInitStateAction,
} from './admin-actions-selector'
import {emptyFields, mergeWithForeignKeys} from "../utils/table-func";
import {getHoursArray} from "../utils/date-time-func";
import {subjects} from "../../components/Containers/init-params";


export const setToastMsg = (subj, toast, dispatch) => {
	dispatch(setToastMsgAction(subj, toast))
	setTimeout(() => {
		dispatch(setToastMsgAction(subj, {type: toast.type, msg: ''}))
	}, 3000)
}

export const setLoader = (subj, data, dispatch) => {
	dispatch(setLoadingAction(subj, data))
}

export const setItems = (subj) => async (dispatch) => {
	const data = await getItems(subj)
	await dispatch(setItemsAction(subj, data));
}

export const getAdminInitState = async (dispatch) => {
	for (let i = 0; i < subjects.length; i += 1) {
		const subj = subjects[i][0];
		const columns = subjects[i][1];
		await dispatch(setItems(subj));
		dispatch(setColumnsAction(subj, columns))
	}
}

export const resetAdminState = (dispatch) => {
	for (let i = 0; i < subjects.length; i += 1) {
		const subj = subjects[i][0];
		dispatch(setInitStateAction(subj));
	}
}

export const removeFromDB = (subj, id) => async (dispatch) => {
	setLoader(subj, true, dispatch);
	const res = await removeItem(id, subj);
	setLoader(subj, false, dispatch);
	setToastMsg(subj, res, dispatch)
	if (res.type === 'success') {
		dispatch(setItems(subj))
	}
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
	dispatch(setDataToChangeAction(subj, res))
	dispatch(toggleStateAction(subj, state))
	setLoader(subj, false, dispatch)
}

export const cancelInput = (subj) => (dispatch) => {
	dispatch(toggleStateAction(subj, null))
	dispatch(setDataToChangeAction(subj, {}));
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
	const orders = await getFilteredOrders({master_id, date, order_id},'orders' )
	return getHoursArray(service_time, orders);
}

export const changeFreeHours = (subj, master_id, date, service_time, order_id) => async (dispatch) => {
	const newHours = await _getFreeHours(master_id, date, service_time, order_id);
	dispatch(changeOrdersHoursAction(subj, newHours))
}





