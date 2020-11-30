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
} from '../../middleware/general'
import AdmTableRedux from "../Table/basic-table";
import BasicTableHeadForm from "../Table/basic-table-head-form";
import BasicTableHead from "../Table/basic-table-head";
import {
	editStateState, errorsState,
	getColumnsState,
	getDataToChangeState,
	getItemsState, helperState
} from "../../middleware/state-selectors";

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
				{editState ? <BasicTableHeadForm formProps={form}/> :
					<BasicTableHead headProps={head}/>
				}
			</AdmTableRedux>
		</>
	)
}


const mapStateToProps = (state) => {
	return ({
		items: getItemsState(subj, state),
		columns: getColumnsState(subj, state),
		dataToChange: getDataToChangeState(subj, state),
		editState: editStateState(subj, state),
		errors: errorsState(subj, state),
		helper: helperState(subj, state),
	})
}

//

export default compose(
	connect(mapStateToProps))(CustomersContainer);