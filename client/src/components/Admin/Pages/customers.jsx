import React, {useEffect} from 'react';
import TableWrapper from "../table-wrapper";
import {useDispatch} from 'react-redux'
import {Button} from '@material-ui/core'
import {compose} from "redux";
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import AdmTable from "../Table/admin-table";
import {deleteItem} from '../../../middleware/requests'
import {actions} from "../../../slices/root-reduser";

const Customers = (props) => {
	const subj = 'customers'
	const dispatch = useDispatch()
	// const {items, columns, dataToChange, editState} = props
	//

	const errorCases = (label, data) => {
		let error;
		switch (label) {
			case "name":
				error = !data.match(/^[a-z0-9_-]*$/i) ? 'Incorrect characters' :
					data.length < 2 ? 'Name is too short' :
						data.length > 16 ? "Name is too long" : '';
				break;
			case "surname":
				error = !data.match(/^[a-z0-9_-]*$/i) ? 'Incorrect characters' :
					data.length < 2 ? 'Surname is too short' :
						data.length > 16 ? "Surname is too long" : '';
				break;
			case "email":
				error = !data.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i) ? 'Invalid email' : '';
				break;
			default:
				break;
		}
		return error;
	}
	const helperText = (label) => {
		let text = '';
		switch (label) {
			case 'id':
				text = 'Unique id';
				break;
			case 'name':
				text = 'First name';
				break;
			case 'surname':
				text = 'Second name';
				break;
			case 'email':
				text = 'Unique email';
				break;
			default:
				break;
		}
		return text;
	}
	// const deleteSelectedItem = (id) => {
	// 	deleteItem(id, subj)
	// 		.then(cancelInput())
	// }

	return (
		<>

			<TableWrapper subj={subj} errorCases={errorCases} helperText={helperText}/>
			{/*const {children, itemsOnPage = 5, data, del, pushItemToEdit} = props;*/}
			{/*<AdmTable data={items} del={deleteSelectedItem}>*/}

			{/*</AdmTable>*/}
		</>
	)
}

// const mapStateToProps = (state) => {
// 	return ({
// 		items: state.customers.customersList,
// 		columns: state.customers.columns,
// 		dataToChange: state.customers.dataToChange,
// 		editState: state.customers.editState
// 	})
// }

//
// export default compose(
// 	connect(mapStateToProps))(Customers);
export default Customers