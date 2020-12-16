import {dateFromFormatToObj, dateFromNewDate} from "./utils/date-time-func";

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
	const date = data.date ? dateFromFormatToObj(data.date) : dateFromNewDate();
	const hours = data.hours;
	return {fields, date, hours}
}

export const getFormDataState = (state) => {
	const data = state.main.formData;
	const date = dateFromNewDate()
	return {
		fields: _sliceData(data, -2),
		date: date, hours: data.hours, begin: data.begin
	}
}

export const getAuthState = (state) => {
	return state.main.isAuth;
}


export const getFreeMastersState = (state) => {
	return state.main.freeMasters;
}
export const getMessage = (state) => {
	return state.main.msg
}