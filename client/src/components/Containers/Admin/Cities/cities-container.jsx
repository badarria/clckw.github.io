import React from 'react';
import {BasicTable} from "../../../Common/table/basic-table";
import BasicTableHead from "../../../Common/table/basic-table-head";
import {compose} from "redux";
import {connect} from "react-redux";
import CitiesForm from "./cities-form";
import {containerDispatchProps, containerStateProps} from "../../utils/props-generator";


const subj = 'cities'
const mapStateToProps = containerStateProps(subj)
const mapDispatchToProps = containerDispatchProps(subj)


const CitiesContainer = ({items, columns, editState, remove, push}) => {

	const errorCases = (label, data) => {
		let error;
		switch (label) {
			case "name":
				error = !data.match(/^[a-z0-9_-]*$/i) ? 'Incorrect characters' :
					data.length < 2 ? 'Name is too short' :
						data.length > 16 ? "Name is too long" : '';
				break;
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
			case 'name':
				text = 'Unique city name';
				break;
			default:
				break;
		}
		return text;
	}


	const tableProps = {items, columns, push, editState, remove}
	const headProps = {columns, push}

	return (
		<>
			<BasicTable {...tableProps}>
				{editState ?
					<CitiesForm/>
					:
					<BasicTableHead {...headProps}/>
				}
			</BasicTable>
		</>
	)
}

export default compose(
	connect(mapStateToProps,
		mapDispatchToProps
	))
(CitiesContainer);