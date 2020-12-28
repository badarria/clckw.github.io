import React from 'react';
import {BasicTable} from "../../../Common/table/basic-table";
import BasicTableHead from "../../../Common/table/basic-table-head";
import {compose} from "redux";
import {connect} from "react-redux";
import CitiesForm from "./cities-form";
import {containerDispatchProps, containerStateProps} from "../../utils/props-selector";
import {Loader} from "../../../Common/loader";


const subj = 'cities'
const mapStateToProps = containerStateProps(subj)
const mapDispatchToProps = containerDispatchProps(subj)


const CitiesContainer = (props) => {
	const {items, columns, editState, remove, push, toast, loading} = props
	const tableProps = {items, columns, push, editState, remove, toast}
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