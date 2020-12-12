import {} from '../utils/func-for-timestamp'

const getItemsState = (subj, state) => {
	return state[subj].list
};
const getColumnsState = (subj, state) => {
	return state[subj].columns
}
const getDataToChangeState = (subj, state) => {
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


const ordersDataToChange = (state) => {
	const data = state.orders.dataToChange;
	let dataForFields = Object.entries(data).slice(0, -5)
	dataForFields = Object.fromEntries(dataForFields)
	let date = data.date;
	let time = data.hours;
	return {fields: dataForFields, date: date, time: time}
}

export {
	getItemsState,
	getDataToChangeState,
	getColumnsState,
	editStateState,
	errorsState,
	helperState,
	ordersDataToChange
}