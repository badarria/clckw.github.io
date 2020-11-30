import {rootReducer} from './redux/root-reduser'
import {configureStore} from '@reduxjs/toolkit'
import {getColumnsThunk, getItemsThunk} from "./middleware/general";


const store = configureStore({
	reducer: rootReducer,
});

const subjects = ['customers', 'services', 'masters', 'orders', 'cities']
const initState = (arr) => {
	arr.forEach(subj => {
		store.dispatch(getItemsThunk(subj));
		store.dispatch(getColumnsThunk(subj));
	})
}
initState(subjects)

export {store}