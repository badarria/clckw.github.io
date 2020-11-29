import {combineReducers} from "@reduxjs/toolkit";
import {reducer as mainReducer} from './main-reducer'
import {createTableReducers} from './table-reducers'

const reducer = (name) => createTableReducers(name).reducer


export const rootReducer = combineReducers({
	main: mainReducer,
	customers: reducer('customers'),
	services: reducer('services'),
	masters: reducer('masters'),
	cities: reducer('cities'),
	orders: reducer('orders'),
});




