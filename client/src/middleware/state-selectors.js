export const getItemsState = (subj, state) => {
	return state[subj].list
};
export const getColumnsState = (subj, state) => {
	return state[subj].columns
}
export const getDataState = (subj, state) => {
	return state[subj].dataToChange
};
export const editStateState = (subj, state) => {
	return state[subj].editState
};
export const errorsState = (subj, state) => {
	return state[subj].errors
};
export const helperState = (subj, state) => {
	return state[subj].helper
};

export const _sliceData = (obj, endSlice) => {
	const res = Object.entries(obj).slice(0, endSlice)
	return Object.fromEntries(res)
}

export const ordersDataState = (state) => {
	const data = state.orders.dataToChange;
	const fields = _sliceData(data, -5)
	const date = data.date;
	const hours = data.hours;
	return {fields, date, hours}
}

export const getFormDataState = (state) => {
	const data = state.main.formData;
	return {
		fields: _sliceData(data, -2),
		date: data.date, hours: data.hours
	}
}

export const getAuthState = (state) => {
	return state.main.isAuth;
}
