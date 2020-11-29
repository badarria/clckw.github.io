import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {store} from './store'
import {Provider} from 'react-redux'
import {getItemsThunkCreator, getColumnsThunkCreator} from "./middleware/thunks";

const subjects = ['customers', 'services', 'masters', 'orders', 'cities']
const initState = (subjsArr) => {
	subjsArr.forEach(subj => {
		store.dispatch(getItemsThunkCreator(subj));
		store.dispatch(getColumnsThunkCreator(subj));
	})
}
initState(subjects)


ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<App/>
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);


