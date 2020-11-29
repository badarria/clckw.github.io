import {createTableReducers} from "./table-reducers";

const action = (name) => createTableReducers(name).actions

export const actions = {
	customers: action('customers'),
	services: action('services'),
	masters: action('masters'),
	cities: action('cities'),
	orders: action('orders'),
}
