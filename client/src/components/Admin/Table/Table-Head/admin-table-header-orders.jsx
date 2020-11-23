import React, {useState} from 'react';
import {TableCell, TableRow, TextField} from "@material-ui/core";
import TableButton from "../table-button";

import PropTypes from "prop-types";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";

import DatePicker from "../date-picker";
import AutocompleteField from "./autocomplete-field.jsx";


const AdminTableHeaderOrders = (props) => {
	const {data, edit, push, cancel} = props

	const {dataToChange, helper} = data;
	console.log(dataToChange)

	return (
		<TableRow component='tr'>
			<TableCell colSpan={2}/>
			<TableCell>
				<AutocompleteField data={dataToChange.master} label='master' edit={edit} helper={helper.master}/>
			</TableCell>
			<TableCell>
				<AutocompleteField data={dataToChange.customer} label='customer' edit={edit} helper={helper.customer}/>
			</TableCell>
			<TableCell>
				<AutocompleteField data={dataToChange.city} label='city' edit={edit} helper={helper.city}/>
			</TableCell>
			<TableCell>
				<AutocompleteField data={dataToChange.service} label='service' edit={edit} helper={helper.service}/>
			</TableCell>
			<TableCell colSpan={2}>
				<DatePicker helperText={helper.date}/>
			</TableCell>

			<TableButton handleClick={push} title='Edit'
									 icon={<DoneIcon fontSize="small"/>} />
			<TableButton handleClick={cancel} title='Cancel' icon={<ClearIcon fontSize="small"/>}/>
		</TableRow>
	)
}


AdminTableHeaderOrders.propTypes = {
	columnNames: PropTypes.array.isRequired,
	createNewItem: PropTypes.func.isRequired
};

export default AdminTableHeaderOrders;