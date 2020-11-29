import {getColumnNames, addItem, updateItem, deleteItem, getItems} from './requests'
import {addCitiesList} from '../slices/main-reducer'


export const getItemsThunkCreator = (subj) => (dispatch) => {
	// dispatch(onLoading);
	// console.log(subj)
	getItems(subj)
		.then((data) => {
			switch (subj) {
				case 'cities':
					dispatch(addCitiesList(data));
					break;
				default:
					break;
			}

		})
	// .then(dispatch(offLoading()))
}



