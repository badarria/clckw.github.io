import {addItem, getCustomer, getFreeMasters, getItems, loginUser, stayAuth} from "./requests";
import {setFormData, setAuth, setMasterMessage, setFreeMasters, setWorkingHours, setNewOrder} from '../redux/main-reducer'
import {getHoursArray} from "./utils/date-time-func";
import {mergeWithForeignKeys} from "./utils/table-func";
import {subjects} from "../components/Containers/init-params";
import {setColumns, setItems} from "./admin-page-thunks";



export const getInitState = async (dispatch, getState) => {
	const city = await getItems('cities');
	const service = await getItems('services');
	const hours = getHoursArray(service.time);
	const formData = Object.entries(getState().main.formData);
	const keys = {city, service}
	const res = mergeWithForeignKeys(formData, keys)
	res.hours = hours
	dispatch(setFormData(res))
}

export const getAdminInitState = async (dispatch) => {
	subjects.forEach(([subj, columns]) => {
		dispatch(setItems(subj));
		dispatch(setColumns(subj, columns))
	})
}

export const setOrderData = (data) => (dispatch) => {
	dispatch(setNewOrder(data))
}

export const changeHours = (service_time) => (dispatch) => {
	const newHours = getHoursArray(service_time);
	dispatch(setWorkingHours(newHours))
}


export const findMasters = ({city, begin, end}) => async (dispatch) => {
	dispatch(setFreeMasters([]))
	dispatch(setMasterMessage(''))
	const masters = await getFreeMasters(city, begin, end)
	if (masters.length) {
		dispatch(setFreeMasters(masters));
		let msg = `Choose a master from the list below to place an order`
		dispatch(setMasterMessage(msg))
	} else {
		let msg = 'Sorry, there are no free masters. Try to choose another time'
		dispatch(setMasterMessage(msg))
	}
}

export const checkCustomer = ({name, surname, email}) => async (dispatch, getState) => {
	let id = await getCustomer(email);
	if (id.length) {
		id = id[0].id
	} else {
		const newCustomer = await addItem({name, surname, email}, 'customers');
		id = newCustomer.id
	}
	const order = {...getState().main.newOrder}
	order.customer = id
	dispatch(setOrderData(order))
}

export const acceptOrder = (id) => async (dispatch, getState) => {
	const order = {...getState().main.newOrder}
	order.master = id
	dispatch(setOrderData(order))
	const data = {...getState().main.newOrder}
	await addItem(data, 'orders')
	dispatch(setOrderData({}))
	console.log('done')
}

export const login = (data) => async (dispatch) => {
	const res = await loginUser(data)
	console.log(res)
	if (res.token) {
		localStorage.setItem("token", res.token)
		dispatch(setAuth(true));
		dispatch(getAdminInitState);
	}
}

export const checkAuth = async (dispatch) => {
	const res = await stayAuth()
	dispatch(setAuth(res === true))
}

export const logout = (dispatch) => {
	localStorage.removeItem("token");
	dispatch(setAuth(false));
}

