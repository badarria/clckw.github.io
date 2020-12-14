import React, {useEffect} from 'react';
import {BasicTable} from "../../Common/table/basic-table";
import BasicTableHead from "../../Common/table/basic-table-head";
import {compose} from "redux";
import {connect} from "react-redux";
import {containerDispatchProps, containerStateProps} from "../utils/props-generator";
import OrdersForm from "./orders-form";


const subj = 'orders'
const columns = ['id', 'service', 'master', 'customer', 'city', 'date', 'begin', 'end']
const mapStateToProps = containerStateProps(subj)
const mapDispatchToProps = containerDispatchProps(subj, columns, true)

const OrdersContainer = (props) => {
	const {items, columns, editState, remove, push, setHelper, setColumns} = props
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
		setHelper(helperText);
		setColumns()
	}, [])


	const tableProps = {items, columns, push, editState, remove}
	const headProps = {columns, push}

	return (
		<>
			<BasicTable {...tableProps}>
				{editState ?
					<OrdersForm/>
					:
					<BasicTableHead {...headProps}/>
				}
			</BasicTable>
		</>
	)
}


export default compose(
	connect(mapStateToProps, mapDispatchToProps))(OrdersContainer);