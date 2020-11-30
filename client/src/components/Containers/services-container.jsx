import React, {useEffect} from 'react';

import {
	acceptChanges,
	cancelInput,
	handleChangeData,
	pushToChange,
	removeFromDB,
	setHelper
} from "../../middleware/general";
import AdmTableRedux from "../Table/basic-table";
import BasicTableHeadForm from "../Table/basic-table-head-form";
import BasicTableHead from "../Table/basic-table-head";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";
import {
	editStateState, errorsState,
	getColumnsState,
	getDataToChangeState,
	getItemsState, helperState
} from "../../middleware/state-selectors";
const subj = 'services'

const ServicesContainer = (props) => {
	const dispatch = useDispatch()
	const {items, errors, helper, columns, dataToChange, editState} = props

	const errorCases = (label, data) => {
		let error;
		switch (label) {
			case "name":
				error = !data.match(/^[a-z0 -9_-]*$/i) ? 'Incorrect characters' :
					data.length < 2 ? 'Name is too short' :
						data.length > 16 ? "Name is too long" : '';
				break;
			case "time":
				error = !data.match(/^\d+$/) ? 'Only digits' : !data.match(/^[1-7]$/) ? 'from 1 to 7 hours' : '';
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
				text = 'Unique service name';
				break;
			case 'time':
				text = 'Duration, hours';
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
		push: pushToChange(subj, dispatch),
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

export default compose(
	connect(mapStateToProps))(ServicesContainer);