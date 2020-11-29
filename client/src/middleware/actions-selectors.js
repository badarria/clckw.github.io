import {actions} from '../redux/actions'

const getItemsAction = (subj, data) => {
	return actions[subj][`get${subj}List`](data)
}

const getColumnsAction = (subj, data) => {
	return actions[subj][`get${subj}Columns`](data)
}

const setDataToChangeAction = (subj) => {
	return actions[subj][`set${subj}DataToChange`]
}

const setEditStateAction = (subj) => {
	return actions[subj][`set${subj}State`]
}

const setErrorHelperAction = (subj, data) => {
	return actions[subj][`set${subj}ErrorHelper`](data)
}
export {getItemsAction, getColumnsAction, setDataToChangeAction, setEditStateAction, setErrorHelperAction}