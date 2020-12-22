import React from 'react';
import {BasicTable} from "../../../Common/table/basic-table";
import BasicTableHead from "../../../Common/table/basic-table-head";
import {compose} from "redux";
import {connect} from "react-redux";
import {containerDispatchProps, containerStateProps} from "../../utils/props-selector";
import OrdersForm from "./orders-form";
import {Toast} from "../../../Common/toast";
import {Loader} from "../../../Common/loader";


const subj = 'orders'
const mapStateToProps = containerStateProps(subj)
const mapDispatchToProps = containerDispatchProps(subj, true)

const OrdersContainer = ({items, columns, editState, remove, push, msg, loading}) => {

	const tableProps = {items, columns, push, editState, remove,msg}
	const headProps = {columns, push}

	return (
		<>
			<Loader loading={loading}/>
			<BasicTable {...tableProps}>
				{editState ?
					<OrdersForm/>
					:
					<BasicTableHead {...headProps}/>}
			</BasicTable>
		</>
	)
}


export default compose(
	connect(mapStateToProps, mapDispatchToProps))(OrdersContainer);