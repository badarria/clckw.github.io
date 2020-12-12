import React, {useEffect} from 'react';
import {
	acceptChanges,
	cancelInput,
	pushToChange,
	removeFromDB, setColumns,
	setHelper
} from "../../../middleware/general";
import {
	getItemsState,
	getDataToChangeState,
	editStateState,
	getColumnsState,
	errorsState,
	helperState
} from '../../../middleware/state-selectors'

import AdmTableRedux from "../../Common/table/basic-table";
import BasicTableHead from "../../Common/table/basic-table-head";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";
import MastersForm from "./masters-form";

const subj = 'masters'
const columnNames = ['id', 'name', 'surname', 'city', 'rating']


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
		setHelper(subj, columns, helperText, dispatch);
		setColumns(subj, columnNames, dispatch)
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
		handleReset: cancelInput(subj, dispatch),
		accept: acceptChanges(subj, editState, dispatch)
		// errors: errors,
		// helper: helper,
	}

	const head = {
		columns: columns,
		create: pushToChange(subj, dispatch, true)
	}

	return (
		<>
			<AdmTableRedux tableProps={table}>
				{editState ?
					<MastersForm {...form} />
					:
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

export default compose(
	connect(mapStateToProps))(MastersContainer);