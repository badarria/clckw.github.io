import React from 'react';
import {TableCell, TableRow, TextField} from "@material-ui/core";
import TableButton from "../table-button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PropTypes from "prop-types";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import AutocompleteTextField from '../autocomplete-text-field'
import DatePicker from "../date-picker";

const AdminTableHeaderOrders = (props) => {
	const {state, dataToChange, editItem, addItem, updateItem, cancelInput} = props


	const data = {
		"master": [
			{
				"id": 3,
				"name": "xgn xngf"
			}
		],
		"customer": [
			{
				"id": 19,
				"name": "fdfafd dvdfsv"
			},
			{
				"id": 16,
				"name": "Uzhgorod fkj"
			},
			{
				"id": 17,
				"name": "ssss csc"
			},
			{
				"id": 14,
				"name": "asvsvfasf dfbsdvf"
			},
			{
				"id": 20,
				"name": "dyj dyj"
			},
			{
				"id": 21,
				"name": "cfgdg hhh"
			},
			{
				"id": 15,
				"name": "ddvv ggg xxzsvvzl"
			},
			{
				"id": 22,
				"name": "ddg gd"
			}
		],
		"service": [
			{
				"id": 1,
				"name": "Big Size"
			},
			{
				"id": 3,
				"name": "Small Size"
			},
			{
				"id": 2,
				"name": "Middle Size"
			}
		],
		"city": [
			{
				"id": 2,
				"name": "Dnepr"
			}
		]
	}

	const labels = Object.keys(data);

	return (
		<TableRow component='tr'>
			<TableCell colSpan={2}/>
			<TableCell >
				<AutocompleteTextField data={data.master}/>
			</TableCell>
			<TableCell>
				<AutocompleteTextField data={data.customer}/>
			</TableCell>
			<TableCell>
				<AutocompleteTextField data={data.service} />
			</TableCell>
			<TableCell>
				<AutocompleteTextField data={data.city} />
			</TableCell>
			<TableCell colSpan={2}>
				<DatePicker timestamp='2020-11-08T14:00:00.000Z'/>
			</TableCell>
			<TableButton handleClick={state === 'isAdding' ? addItem : updateItem} title='Edit'
									 icon={<DoneIcon fontSize="small"/>}/>
			<TableButton handleClick={cancelInput} title='Cancel' icon={<ClearIcon fontSize="small"/>}/>
		</TableRow>
	)
}


AdminTableHeaderOrders.propTypes = {
	columnNames: PropTypes.array.isRequired,
	createNewItem: PropTypes.func.isRequired
};

export default AdminTableHeaderOrders;