import React, {useEffect} from 'react';
import TableWrapper from "../table-wrapper";
import {useDispatch, connect} from 'react-redux'
import {compose} from "redux";
import {getItemsThunkCreator, setErrorHelper, removeItemFromDB} from '../../../middleware/thunks'
import AdmTable from "../Table/admin-table";


const subj = 'customers'

const Customers = (props) => {
	const dispatch = useDispatch()
	const {items, errors, helper, columns, dataToChange, editState, foreignKeys} = props

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

	useEffect(() => {
		dispatch(getItemsThunkCreator(subj)(dispatch))
		const data = {errors: errorCases, helper: helperText}
		setErrorHelper(subj, data, dispatch)
	}, [])

	return (
		<>

			{/*<TableWrapper subj={subj} errorCases={errorCases} helperText={helperText} itemsRedux={items} foreignKeys={foreignKeys}/>*/}
			{/*const {children, itemsOnPage = 5, data, del, pushItemToEdit} = props;*/}
			<AdmTable data={items} del={removeItemFromDB(subj, dispatch)}/>

			{/*</AdmTable>*/}
		</>
	)
}


// export default Customers
const mapStateToProps = (state) => {
	return ({
		items: state[subj].list,
		columns: state[subj].columns,
		dataToChange: state[subj].dataToChange,
		editState: state[subj].editState,
		errors: state[subj].errors,
		helper: state[subj].helper,
		foreignKeys: null,
	})
}

//

export default compose(
	connect(mapStateToProps))(Customers);