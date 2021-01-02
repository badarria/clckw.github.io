import {dateFromFormatToObj, dateFromNewDate} from "./utils/date-time-func";

export const getItemsState = (subj, state) => {
	return state[subj].list
};
export const getColumnsState = (subj, state) => {
	return state[subj].columns
}


/////dataForm states
export const _sliceData = (obj, endSlice) => {
	const res = Object.entries(obj).slice(0, endSlice)
	return Object.fromEntries(res)
}
const _ordersDataState = (state) => {
	const data = state.orders.dataToChange;
	const fields = _sliceData(data, -5)
	const date = data.date ? dateFromFormatToObj(data.date) : dateFromNewDate();
	const hours = data.hours;
	return {fields, date, hours, begin: data.begin}
}
const _mastersDataState = (state) => {
	const data = state.masters.dataToChange;
	return _sliceData(data, -1);
}

export const getDataState = (subj, state) => {
	if (subj === 'orders') return _ordersDataState(state);
	else if (subj === 'masters') return _mastersDataState(state);
	else return state[subj].dataToChange
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

export const getFormDataState = (state) => {
	const data = state.home.formData;
	const date = dateFromNewDate()
	return {
		fields: _sliceData(data, -2),
		date: date, hours: data.hours, begin: data.begin
	}
}

export const getAuthState = (state) => {
	return state.home.isAuth;
}

export const getFreeMastersState = (state) => {
	return state.home.freeMasters;
}

export const getToastMsgState = (subj, state) => {
	return state[`${subj}`].toast
}

export const getLoadingState = (subj, state) => {
	return state[subj].loading
}

export const getPagingState = (subj, state) => {
	return state[subj].paging
}