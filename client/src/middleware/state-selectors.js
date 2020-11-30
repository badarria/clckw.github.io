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
const keysForMasters = (state) => {
	return {city: state.cities.list}
}
const keysForOrders = (state) => {
	return {
		city: state.cities.list,
		customer: state.customers.list,
		master: state.masters.list,
		service: state.services.list,
	}
}

export {
	getItemsState,
	getDataToChangeState,
	getColumnsState,
	editStateState,
	errorsState,
	helperState,
	keysForMasters,
	keysForOrders
}