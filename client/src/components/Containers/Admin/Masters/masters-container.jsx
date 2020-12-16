import React from 'react';
import {BasicTable} from "../../../Common/table/basic-table";
import BasicTableHead from "../../../Common/table/basic-table-head";
import {compose} from "redux";
import {connect} from "react-redux";
import MastersForm from "./masters-form";
import {containerDispatchProps, containerStateProps} from "../../utils/props-selector";


const subj = 'masters'
const mapStateToProps = containerStateProps(subj)
const mapDispatchToProps = containerDispatchProps(subj, true)

const MastersContainer = ({items, columns, editState, remove, push}) => {

	const tableProps = {items, columns, push, editState, remove}
	const headProps = {columns, push}

	return (
		<>
			<BasicTable {...tableProps}>
				{editState ?
					<MastersForm />
					:
					<BasicTableHead {...headProps}/>
				}
			</BasicTable>
		</>
	)
}


export default compose(
	connect(mapStateToProps, mapDispatchToProps))(MastersContainer);