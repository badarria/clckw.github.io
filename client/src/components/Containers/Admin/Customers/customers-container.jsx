import React from 'react';
import {connect} from 'react-redux'
import {compose} from "redux";
import {BasicTable} from "../../../Common/table/basic-table";
import BasicTableHead from "../../../Common/table/basic-table-head";
import CustomersForm from "./customers-form";
import {containerDispatchProps, containerStateProps} from "../../utils/props-selector";
import {Toast} from "../../../Common/toast";

const subj = 'customers'
const mapStateToProps = containerStateProps(subj)
const mapDispatchToProps = containerDispatchProps(subj)


const CustomersContainer = ({items, columns, editState, remove, push, msg}) => {

	const tableProps = {items, columns, push, editState, remove}
	const headProps = {columns, push}

	return (
		<>
			<BasicTable {...tableProps}>
				{editState ?
					<CustomersForm/>
					:
					<BasicTableHead {...headProps}/>
				}
			</BasicTable>
			<Toast msg={msg} />
		</>
	)
}


export default compose(
	connect(mapStateToProps, mapDispatchToProps))(CustomersContainer);