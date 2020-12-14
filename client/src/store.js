import {rootReducer} from './redux/root-reduser'
import {configureStore} from '@reduxjs/toolkit'
import {getColumnsThunk, getInitState, getItemsThunk} from "./middleware/thunks";


const store = configureStore({
	reducer: rootReducer,
});

// const subjects = ['customers', 'services', 'masters', 'orders', 'cities']
//
//
// const initState = (arr) => {
// 	arr.forEach(subj => {
// 		store.dispatch(getItemsThunk(subj));
// 		store.dispatch(getColumnsThunk(subj));
// 	})
// }
// initState(subjects)
store.dispatch(getInitState)
export {store}