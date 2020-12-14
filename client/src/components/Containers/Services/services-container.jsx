import React, {useEffect} from 'react';
import {BasicTable} from "../../Common/table/basic-table";
import BasicTableHead from "../../Common/table/basic-table-head";
import {compose} from "redux";
import {connect} from "react-redux";
import ServicesForm from "./services-form";
import {containerDispatchProps, containerStateProps} from "../utils/props-generator";

const subj = 'services'
const columns = ['id', 'name', 'time']
const mapStateToProps = containerStateProps(subj)
const mapDispatchToProps = containerDispatchProps(subj, columns)

const ServicesContainer = (props) => {
	const {items, columns, editState, remove, push, setHelper, setColumns} = props

	const errorCases = (label, data) => {
		let error;
		switch (label) {
			case "name":
				error = !data.match(/^[a-z0 -9_-]*$/i) ? 'Incorrect characters' :
					data.length < 2 ? 'Name is too short' :
						data.length > 16 ? "Name is too long" : '';
				break;
			case "time":
				error = !data.match(/^\d+$/) ? 'Only digits' : !data.match(/^[1-7]$/) ? 'from 1 to 7 hours' : '';
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
				text = 'Unique service name';
				break;
			case 'time':
				text = 'Duration, hours';
				break;
			default:
				break;
		}
		return text;
	}

	useEffect(() => {
		setHelper(helperText);
		setColumns()
	}, [])

	const tableProps = {items, columns, push, editState, remove}
	const headProps = {columns, push}

	return (
		<>
			<BasicTable {...tableProps}>
				{editState ?
					<ServicesForm />
					:
					<BasicTableHead {...headProps}/>
				}
			</BasicTable>
		</>
	)
}


export default compose(
	connect(mapStateToProps, mapDispatchToProps))(ServicesContainer);