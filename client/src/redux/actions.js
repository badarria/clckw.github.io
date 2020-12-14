import {createTableReducers} from "./table-reducers";
import {setFormData, setAuth, setWorkingHours} from './main-reducer';

const action = (name) => createTableReducers(name).actions

export const actions = {
	customers: action('customers'),
	services: action('services'),
	masters: action('masters'),
	cities: action('cities'),
	orders: action('orders'),
	setFormData, setAuth, setWorkingHours
}
