import React, {useEffect} from 'react';
import {useDispatch, connect} from 'react-redux'
import {compose} from "redux";
import {
	setHelper,
	removeFromDB,
	pushToChange,
	acceptChanges,
	handleChangeData,
	cancelInput
} from '../../../middleware/general'
import AdmTableRedux from "../Table/admin-table--redux";
import AdminTableHeaderEditingRedux from "../Table/Table-Head/admin-table-header-editing-redux";
import AdminTableHeaderRedux from "../Table/Table-Head/admin-table-header-redux";

const subj = 'customers'

const CustomersContainer = (props) => {
	const dispatch = useDispatch()
	const {items, errors, helper, columns, dataToChange, editState} = props

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
	const table = {
		items: items,
		columns: columns,
		state: editState,
		del: removeFromDB(subj, dispatch),
		push: pushToChange(subj, dispatch),
	}
	useEffect(() => {
			setHelper(subj, columns, helperText, dispatch)
	}, [])

	const form = {
		data: dataToChange,
		edit: handleChangeData(subj, dispatch, errorCases),
		accept: acceptChanges(subj, editState, dispatch),
		cancel: cancelInput(subj, dispatch),
		state: editState,
		errors: errors,
		helper: helper,
	}

	const head = {
		columns: columns,
		create: pushToChange(subj, dispatch)
	}


	return (
		<>
			<AdmTableRedux tableProps={table}>
				{editState ? <AdminTableHeaderEditingRedux formProps={form}/> :
					<AdminTableHeaderRedux headProps={head}/>
				}
			</AdmTableRedux>
		</>
	)
}


const mapStateToProps = (state) => {
	return ({
		items: state[subj].list,
		columns: state[subj].columns,
		dataToChange: state[subj].dataToChange,
		editState: state[subj].editState,
		errors: state[subj].errors,
		helper: state[subj].helper,
	})
}

//

export default compose(
	connect(mapStateToProps))(CustomersContainer);