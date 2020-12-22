import React from 'react';
import {connect} from 'react-redux'
import {compose} from "redux";
import {BasicTable} from "../../../Common/table/basic-table";
import BasicTableHead from "../../../Common/table/basic-table-head";
import CustomersForm from "./customers-form";
import {containerDispatchProps, containerStateProps} from "../../utils/props-selector";
import {Toast} from "../../../Common/toast";
import {Loader} from "../../../Common/loader";

const subj = 'customers'
const mapStateToProps = containerStateProps(subj)
const mapDispatchToProps = containerDispatchProps(subj)


const CustomersContainer = ({items, columns, editState, remove, push, msg, loading}) => {

	const tableProps = {items, columns, push, editState, remove, msg}
	const headProps = {columns, push}

	return (
		<>
			<Loader loading={loading}/>
			<BasicTable {...tableProps}>
				{editState ?
					<CustomersForm/>
					:
					<BasicTableHead {...headProps}/>}
			</BasicTable>
		</>
	)
}


export default compose(
	connect(mapStateToProps, mapDispatchToProps))(CustomersContainer);