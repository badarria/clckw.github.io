import {combineReducers} from "@reduxjs/toolkit";
import {reducer as mainReducer} from './main-reducer'
import {createTableReducers} from './table-reducers'

const reducer = (name) => createTableReducers(name).reducer
const actions = (name) => createTableReducers(name).actions

export const rootReducer = combineReducers({
	main: mainReducer,
	customers: reducer('customers'),
	services: reducer('services'),
	masters: reducer('masters'),
	cities: reducer('cities'),
	orders: reducer('orders'),
});

export const actions = {
	customers: actions('customers'),
	services: actions('services'),
	masters: actions('masters'),
	cities: actions('cities'),
	orders: actions('orders'),
}



