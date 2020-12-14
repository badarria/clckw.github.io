import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {compose} from "redux";
import {BasicTable} from "../../Common/table/basic-table";
import BasicTableHead from "../../Common/table/basic-table-head";
import CustomersForm from "./customers-form";
import {containerDispatchProps, containerStateProps} from "../utils/props-generator";

const subj = 'customers'
const columns = ['id', 'name', 'surname', 'email']
const mapStateToProps = containerStateProps(subj)
const mapDispatchToProps = containerDispatchProps(subj, columns)


const CustomersContainer = (props) => {
	const {items, columns, editState, remove, push, setHelper, setColumns} = props

	const errorCases = (label, data) => {
		let error;
		switch (label) {
			case "name":
				error = !data.match(/^[a-z0-9_-]*$/i) ? 'Incorrect characters' :
					data.length < 2 ? 'Name is too short' :
						data.length > 16 ? "Name is too long" : '';
				break;
			case "surname":
				error = !data.match(/^[a-z0-9_-]*$/i) ? 'Incorrect characters' :
					data.length < 2 ? 'Surname is too short' :
						data.length > 16 ? "Surname is too long" : '';
				break;
			case "email":
				error = !data.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i) ? 'Invalid email' : '';
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
				text = 'First name';
				break;
			case 'surname':
				text = 'Second name';
				break;
			case 'email':
				text = 'Unique email';
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
					<CustomersForm/>
					:
					<BasicTableHead {...headProps}/>
				}
			</BasicTable>
		</>
	)
}


export default compose(
	connect(mapStateToProps, mapDispatchToProps))(CustomersContainer);