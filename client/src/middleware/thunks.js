import {getColumnNames, addItem, updateItem, deleteItem, getItems} from './requests'
import {
	getItemsAction,
	getColumnsAction,
	setDataToChange,
	setEditState,
	setErrorHelperAction
} from './actions-selectors'


export const getItemsThunkCreator = (subj) => async (dispatch) => {
	// dispatch(onLoading);
	// console.log(subj)
	const data = await getItems(subj)
	dispatch(getItemsAction(subj, data));
}

export const getColumnsThunkCreator = (subj) => async (dispatch) => {
	const data = await getColumnNames(subj);
	dispatch(getColumnsAction(subj, data));
}

export const setErrorHelper = (subj, data, dispatch) => {
	dispatch(setErrorHelperAction(subj, data))
}

export const removeItemFromDB = (subj) => (id) => async (dispatch) => {
	await deleteItem(id, subj);
	await dispatch(getItemsThunkCreator(subj))
}

// export const getInitState = (subjsArr) => async dispatch => {
// 	const res = subjsArr.forEach(subj => {
// 		const items =  getItems(subj)
// 	})
//
// }

