import {rootReducer, actions} from './slices/root-reduser'
import {configureStore} from '@reduxjs/toolkit'


const store = configureStore({
	reducer: rootReducer,
});


export {store}