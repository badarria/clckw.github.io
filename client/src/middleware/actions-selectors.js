import {actions} from '../redux/actions'

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

///////Main page///////
export const setFormDataAction = (data) => {
	return actions.setFormData(data);
}

export const setHoursAction = (data) => {
	return actions.setWorkingHours(data);
}

export const setAuthAction = (data) => {
	return actions.setAuth(data);
}

export const setFreeMastersAction = (data) => {
	return actions.setFreeMasters(data);
}
