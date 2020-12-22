import React from 'react';
import {BasicTable} from "../../../Common/table/basic-table";
import BasicTableHead from "../../../Common/table/basic-table-head";
import {compose} from "redux";
import {connect} from "react-redux";
import CitiesForm from "./cities-form";
import {containerDispatchProps, containerStateProps} from "../../utils/props-selector";
import {Toast} from "../../../Common/toast";
import {Loader} from "../../../Common/loader";


const subj = 'cities'
const mapStateToProps = containerStateProps(subj)
const mapDispatchToProps = containerDispatchProps(subj)


const CitiesContainer = ({items, columns, editState, remove, push, msg, loading}) => {

	const tableProps = {items, columns, push, editState, remove, msg}
	const headProps = {columns, push}

	return (
		<>
			<Loader loading={loading}/>
			<BasicTable {...tableProps}>
				{editState ?
					<CitiesForm/>
					:
					<BasicTableHead {...headProps}/>}
			</BasicTable>
		</>
	)
}

export default compose(
	connect(mapStateToProps,
		mapDispatchToProps
	))
(CitiesContainer);