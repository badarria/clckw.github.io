import {combineReducers} from "@reduxjs/toolkit";
import {reducer as homeReducer} from './home-reducer'
import {createTableReducers} from './table-reducers'

const reducer = (name) => createTableReducers(name).reducer


export const rootReducer = combineReducers({
	home: homeReducer,
	customers: reducer('customers'),
	services: reducer('services'),
	masters: reducer('masters'),
	cities: reducer('cities'),
	orders: reducer('orders'),
});




