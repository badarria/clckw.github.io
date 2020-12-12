import {actions} from '../redux/actions'

const setItemsAction = (subj, data) => {
	return actions[subj][`get${subj}List`](data)
}

const setColumnsAction = (subj, data) => {
	return actions[subj][`get${subj}Columns`](data)
}

const setDataToChangeAction = (subj, data) => {
	return actions[subj][`set${subj}DataToChange`](data)
}

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

const clearDataToChangeAction = (subj) => {
	return actions[subj][`clear${subj}DataToChange`]
}

const changeHoursAction = (subj, data) => {
	return actions[subj][`change${subj}FreeHours`](data)
}

export {
	setItemsAction,
	setColumnsAction,
	setDataToChangeAction,
	setErrorsAction,
	setHelperAction,
	pushToChangeAction,
	toggleStateAction,
	clearDataToChangeAction,
	changeHoursAction
}