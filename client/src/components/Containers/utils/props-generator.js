import {
	editStateState,
	errorsState,
	getColumnsState,
	getDataState,
	getItemsState, helperState, ordersDataState
} from "../../../middleware/state-selectors";
import {
	accept,
	cancelInput,
	changeFreeHours,
	pushToChange,
	removeFromDB,
	setColumns,
	setHelper
} from "../../../middleware/thunks";


export const containerStateProps = (subj) => (state) => {
	return ({
		items: getItemsState(subj, state),
		columns: getColumnsState(subj, state),
		dataToChange: getDataState(subj, state),
		editState: editStateState(subj, state),
		errors: errorsState(subj, state),
		helper: helperState(subj, state),
	})
}

export const containerDispatchProps = (subj, columns, getKeys = false) => (dispatch) => {
	return ({
		remove: (id) => dispatch(removeFromDB(subj, id)),
		push: (data, state) => dispatch(pushToChange(subj, data, state, getKeys)),
		handleReset: () => dispatch(cancelInput(subj)),
		setHelper: (text) => dispatch(setHelper(subj, columns, text)),
		setColumns: () => dispatch(setColumns(subj, columns, dispatch)),
		accept: (data) => dispatch(accept(subj, data)),
	})
}


export const formStateProps = (subj) => (state) => {
	return ({
		data: subj === 'orders' ? ordersDataState(state) : getDataState(subj, state),
		errors: errorsState(subj, state),
		helper: helperState(subj, state),
	})
}
export const formDispatchProps = (subj) => (dispatch) => {
	return ({
		handleReset: () => dispatch(cancelInput(subj)),
		accept: (data) => dispatch(accept(subj, data)),
		changeHours: subj === 'orders' ? (master_id, date, service_time, order_id) => dispatch(changeFreeHours(subj, master_id, date, service_time, order_id)) : null
	})
}