import {createTableReducers} from "../redux/table-reducers";

const action = (name) => createTableReducers(name).actions

const actions = {
	customers: action('customers'),
	services: action('services'),
	masters: action('masters'),
	cities: action('cities'),
	orders: action('orders'),
}

export const setItemsAction = (subj, data) => {
	return actions[subj][`get${subj}List`](data)
}

export const setColumnsAction = (subj, data) => {
	return actions[subj][`get${subj}Columns`](data)
}

// export const setErrorsAction = (subj, data) => {
// 	return actions[subj][`set${subj}Errors`](data)
// }

// export const setHelperAction = (subj, data) => {
// 	return actions[subj][`set${subj}Helper`](data)
// }

export const pushToChangeAction = (subj, data) => {
	return actions[subj][`push${subj}ToChange`](data)
}

export const toggleStateAction = (subj, data) => {
	return actions[subj][`toggle${subj}EditState`](data)
}

export const clearDataAction = (subj) => {
	return actions[subj][`clear${subj}DataToChange`]()
}

export const changeOrdersHoursAction = (subj, data) => {
	return actions[subj][`change${subj}FreeHours`](data)
}

export const setToastMsgAction = (subj, data) => {
	return actions[subj][`set${subj}ToastMsg`](data)
}

export const setLoadingAction = (subj, data) => {
	return actions[subj][`set${subj}Loader`](data)
}