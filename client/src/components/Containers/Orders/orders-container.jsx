import React, {useEffect} from 'react';
import {
	acceptChanges,
	cancelInput,
	pushToChange,
	removeFromDB,
	setHelper,
	setColumns,
	changeFreeHours
} from "../../../middleware/general";
import AdmTableRedux from "../../Common/table/basic-table";
import BasicTableHead from "../../Common/table/basic-table-head";
import {
	editStateState, errorsState,
	getColumnsState,
	getItemsState, helperState, ordersDataToChange
} from "../../../middleware/state-selectors";
import {compose} from "redux";
import {connect, useDispatch} from "react-redux";
import OrderHeadForm from "./orders-form";


const subj = 'orders'
const columnNames = ['id', 'service', 'master', 'customer', 'city', 'date', 'begin', 'end']


const OrdersContainer = (props) => {
	const dispatch = useDispatch()
	const {items, errors, helper, columns, dataToChange, editState} = props

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
		fields: dataToChange.fields,
		date: dataToChange.date,
		time: dataToChange.time,
		handleReset: cancelInput(subj, dispatch),
		changeHours: changeFreeHours(subj,dispatch),
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
					<OrderHeadForm {...form} />
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
		dataToChange: ordersDataToChange(state),
		editState: editStateState(subj, state),
		errors: errorsState(subj, state),
		helper: helperState(subj, state),
	})
}

export default compose(
	connect(mapStateToProps))(OrdersContainer);