import React from 'react';
import {BasicTable} from "../../../Common/table/basic-table";
import BasicTableHead from "../../../Common/table/basic-table-head";
import {compose} from "redux";
import {connect} from "react-redux";
import ServicesForm from "./services-form";
import {containerDispatchProps, containerStateProps} from "../../utils/props-selector";

const subj = 'services'
const mapStateToProps = containerStateProps(subj)
const mapDispatchToProps = containerDispatchProps(subj)

const ServicesContainer = ({items, columns, editState, remove, push}) => {

	const tableProps = {items, columns, push, editState, remove}
	const headProps = {columns, push}

	return (
		<>
			<BasicTable {...tableProps}>
				{editState ?
					<ServicesForm/>
					:
					<BasicTableHead {...headProps}/>
				}
			</BasicTable>
		</>
	)
}


export default compose(
	connect(mapStateToProps, mapDispatchToProps))(ServicesContainer);