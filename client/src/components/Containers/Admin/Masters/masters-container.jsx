import React from 'react';
import {BasicTable} from "../../../Common/table/basic-table";
import BasicTableHead from "../../../Common/table/basic-table-head";
import {compose} from "redux";
import {connect} from "react-redux";
import MastersForm from "./masters-form";
import {containerDispatchProps, containerStateProps} from "../../utils/props-selector";
import {Toast} from "../../../Common/toast";
import {Loader} from "../../../Common/loader";


const subj = 'masters'
const mapStateToProps = containerStateProps(subj)
const mapDispatchToProps = containerDispatchProps(subj, true)

const MastersContainer = ({items, columns, editState, remove, push, msg, loading}) => {

	const tableProps = {items, columns, push, editState, remove}
	const headProps = {columns, push}

	return (
		<>
			<Loader loading={loading}/>
			<BasicTable {...tableProps}>
				{editState ?
					<MastersForm/>
					:
					<BasicTableHead {...headProps}/>}
			</BasicTable>
			<Toast msg={msg}/>
		</>
	)
}


export default compose(
	connect(mapStateToProps, mapDispatchToProps))(MastersContainer);