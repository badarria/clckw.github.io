const getItemsState = (subj, state) => {
	return state[subj].list
};
const getColumnsState = (subj, state) => {
	return state[subj].columns
}
const getDataState = (subj, state) => {
	return state[subj].dataToChange
};
const editStateState = (subj, state) => {
	return state[subj].editState
};
const errorsState = (subj, state) => {
	return state[subj].errors
};
const helperState = (subj, state) => {
	return state[subj].helper
};
const _sliceData = (obj, endSlice) => {
	const res = Object.entries(obj).slice(0, endSlice)
	return Object.fromEntries(res)
}

const ordersDataState = (state) => {
	const data = state.orders.dataToChange;
	const fields = _sliceData(data, -5)
	const date = data.date;
	const hours = data.hours;
	return {fields, date, hours}
}

const getFormDataState = (state) => {
	const data = state.main.formData;
	return {fields: _sliceData(data, -2) , date: data.date, hours: data.hours}
}

const getAuth = (state) => {
	return state.auth;
}

export {
	getItemsState,
	getDataState,
	getColumnsState,
	editStateState,
	errorsState,
	helperState,
	ordersDataState,
	getFormDataState,
	getAuth
}