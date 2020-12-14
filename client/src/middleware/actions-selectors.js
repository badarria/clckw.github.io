import {actions} from '../redux/actions'

const setItemsAction = (subj, data) => {
	return actions[subj][`get${subj}List`](data)
}

const setColumnsAction = (subj, data) => {
	return actions[subj][`get${subj}Columns`](data)
}

// const setDataToChangeAction = (subj, data) => {
// 	return actions[subj][`set${subj}DataToChange`](data)
// }

const setErrorsAction = (subj, data) => {
	return actions[subj][`set${subj}Errors`](data)
}

const setHelperAction = (subj, data) => {
	return actions[subj][`set${subj}Helper`](data)
}

const pushToChangeAction = (subj, data) => {
	return actions[subj][`push${subj}ToChange`](data)
}

const toggleStateAction = (subj, data) => {
	return actions[subj][`toggle${subj}EditState`](data)
}

const clearDataAction = (subj) => {
	return actions[subj][`clear${subj}DataToChange`]()
}

const changeOrdersHoursAction = (subj, data) => {
	return actions[subj][`change${subj}FreeHours`](data)
}

///////Main page///////
const setFormDataAction = (data) => {
	return actions.setFormData(data);
}

const setHoursAction = (data) => {
	return actions.setWorkingHours(data);
}

const setAuthAction = (data) => {
	return actions.setAuth(data);
}

const setFreeMastersAction = (data) => {
	return actions.setFreeMasters(data);
}

export {
	setItemsAction,
	setColumnsAction,
	setErrorsAction,
	setHelperAction,
	pushToChangeAction,
	toggleStateAction,
	clearDataAction,
	changeOrdersHoursAction,
	setFormDataAction,
	setHoursAction,
	setAuthAction,
	setFreeMastersAction
}