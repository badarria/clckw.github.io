import React from 'react';
import {BasicTable} from "../../../Common/table/basic-table";
import BasicTableHead from "../../../Common/table/basic-table-head";
import {compose} from "redux";
import {connect} from "react-redux";
import ServicesForm from "./services-form";
import {containerDispatchProps, containerStateProps} from "../../utils/props-selector";
import {Loader} from "../../../Common/loader";

const subj = 'services'
const mapStateToProps = containerStateProps(subj)
const mapDispatchToProps = containerDispatchProps(subj)

const ServicesContainer = (props) => {
	const {items, columns, editState, remove, push, toast, loading} = props;
	const tableProps = {items, columns, push, editState, remove, toast}
	const headProps = {columns, push}

	return (
		<>
			<Loader loading={loading}/>
			<BasicTable {...tableProps}>
				{editState ?
					<ServicesForm/>
					:
					<BasicTableHead {...headProps}/>}
			</BasicTable>
		</>
	)
}


export default compose(
	connect(mapStateToProps, mapDispatchToProps))(ServicesContainer);