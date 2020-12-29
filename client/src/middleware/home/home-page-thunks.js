import {getCustomer, getFreeMasters, loginUser} from "./home-requests";
import {addItem, getItems} from "../admin/admin-requests";
import {
	setFormData,
	setAuth,
	setMasterMessage,
	setFreeMasters,
	setWorkingHours,
	setNewOrder,
	setToastMsg,
	setLoader
} from '../../redux/home-reducer'
import {dateToRequest, getHoursArray} from "../utils/date-time-func";
import {mergeWithForeignKeys} from "../utils/table-func";
import {getAdminInitState, resetAdminState, setItems} from "../admin/admin-page-thunks";


const _setHomePageToastMsg = (toast, dispatch) => {
	dispatch(setToastMsg(toast))
	setTimeout(() => {
		dispatch(setToastMsg({type: toast.type, msg: ''}))
	}, 3000)
}

export const getInitState = async (dispatch, getState) => {
	const city = await getItems('cities');
	const service = await getItems('services');
	const hours = getHoursArray(service.time);
	const formData = Object.entries(getState().home.formData);
	const keys = {city, service}
	const res = mergeWithForeignKeys(formData, keys)
	res.hours = hours
	dispatch(setFormData(res))
}

export const setOrderData = (data) => (dispatch) => {
	if (data.date instanceof Date) {
		data.date = dateToRequest(data.date)
	}
	dispatch(setNewOrder(data))
}

export const changeHours = (service_time) => (dispatch) => {
	const newHours = getHoursArray(service_time);
	dispatch(setWorkingHours(newHours))
}


export const findMasters = (data) => async (dispatch) => {
	dispatch(setFreeMasters([]))
	dispatch(setMasterMessage(''))
	dispatch(setLoader(true))
	const masters = await getFreeMasters(data)
	dispatch(setLoader(false))
	if (masters.length) {
		dispatch(setFreeMasters(masters));
		let msg = `Choose a master from the list below to place an order`
		dispatch(setMasterMessage(msg))
		return true
	} else {
		let msg = 'Sorry, there are no free masters. Try to choose another time'
		dispatch(setMasterMessage(msg))
		return false
	}
}

export const checkCustomer = (data) => async (dispatch, getState) => {
	let id = await getCustomer(data);
	const order = {...getState().home.newOrder}
	order.customer = id[0]
	dispatch(setOrderData(order))
}

export const acceptOrder = (id) => async (dispatch, getState) => {
	dispatch(setLoader(true))
	const order = {...getState().home.newOrder}
	const isAuth = getState().home.isAuth;
	order.master = {id}
	dispatch(setOrderData(order))
	const data = {...getState().home.newOrder}
	const res = await addItem(data, 'orders')
	if (isAuth) {
		await dispatch(setItems('orders'))
		await dispatch(setItems('customers'))
	}
	dispatch(setLoader(false))
	if (res.type === 'success') {
		dispatch(setOrderData({}))
		dispatch(setFreeMasters([]))
		dispatch(setMasterMessage(''))
	}
	_setHomePageToastMsg(res, dispatch)
}

export const login = (data) => async (dispatch) => {
	dispatch(setLoader(true))
	const res = await loginUser(data)
	if (res.token) {
		localStorage.setItem("token", res.token)
		dispatch(setAuth(true));
		await getAdminInitState(dispatch);
		dispatch(setLoader(false))
		return {status: true, msg: "Success"}
	} else {
		dispatch(setLoader(false))
		return {status: false, msg: res}
	}
}


export const logout = (dispatch) => {
	localStorage.removeItem("token");
	dispatch(setAuth(false));
	dispatch(resetAdminState)
}


