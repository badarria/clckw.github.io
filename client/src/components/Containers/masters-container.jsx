import React, {useEffect} from 'react';
import {
	acceptChanges,
	cancelInput,
	handleChangeData,
	pushToChange,
	removeFromDB,
	setHelper
} from "../../middleware/general";
import {
	getItemsState,
	getDataToChangeState,
	editStateState,
	getColumnsState,
	errorsState,
	helperState
} from '../../middleware/state-selectors'

import AdmTableRedux from "../Table/basic-table";
import BasicTableHeadForm from "../Table/basic-table-head-form";
import BasicTableHead from "../Table/basic-table-head";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";

const subj = 'masters'


const MastersContainer = (props) => {
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
			case "rating":
				error = !data.match(/^[1-5]$/) ? '1 to 5 only' : '';
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
			case 'city':
				text = 'Select city';
				break;
			case 'name':
				text = 'First name';
				break;
			case 'surname':
				text = 'Second name';
				break;
			case 'rating':
				text = 'rate 1 to 5';
				break;
			default:
				break;
		}
		return text;
	}


	useEffect(() => {
		setHelper(subj, columns, helperText, dispatch)
	}, [])

	const table = {
		items: items,
		columns: columns,
		state: editState,
		del: removeFromDB(subj, dispatch),
		push: pushToChange(subj, dispatch, true),
	}

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
		create: pushToChange(subj, dispatch, true)
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
		// foreignKeys: keysForMasters(state)
	})
}

export default compose(
	connect(mapStateToProps))(MastersContainer);