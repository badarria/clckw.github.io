import React, {useEffect} from 'react';
import TableWrapper from "../../temp/table-wrapper";
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
import {
	editStateState, errorsState,
	getColumnsState,
	getDataToChangeState,
	getItemsState, helperState, keysForOrders
} from "../../middleware/state-selectors";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";

const subj = 'orders'


const OrdersContainer = (props) => {
	const dispatch = useDispatch()
	const {items, errors, helper, columns, dataToChange, editState, foreignKeys} = props

	const errorCases = (label, data) => {
		let error = '';
		switch (label) {

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
			case 'master':
				text = 'First select a master';
				break;
			case 'city':
				text = 'City of master';
				break;
			case 'customer':
				text = 'Customers name';
				break;
			case 'service':
				text = 'Service name';
				break;
			case 'date':
				text = 'Choose a date';
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
		push: pushToChange(subj, dispatch, foreignKeys),
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
		create: pushToChange(subj, dispatch, foreignKeys)
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
		foreignKeys: keysForOrders(state)
	})
}

export default compose(
	connect(mapStateToProps))(OrdersContainer);