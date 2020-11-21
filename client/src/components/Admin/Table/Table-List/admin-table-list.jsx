import React from "react";
import TableRow from "@material-ui/core/TableRow";
import AdminTableListItem from "./admin-table-list-i";
import PropTypes from "prop-types";
import {TableCell} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TableButton from "../table-button";
import AlertDialog from "../dialog-window";

const AdminTableList = (props) => {
	const {data, deleteSelectedItem, pushItemToEdit, state} = props;


	return (
		data.map((item, indx) => {
			const data = Object.entries(item);
			const id = item.id;

			return (
				<TableRow key={id} component='tr'>
					<TableCell component='td'>{indx + 1}</TableCell>
					<AdminTableListItem data={data}/>
					<TableButton handleClick={() => pushItemToEdit(item)} title='Edit' icon={<EditIcon fontSize="small"/>}
											 disabled={!!state}/>
					<AlertDialog acceptFunc={() => deleteSelectedItem(id)} title='Delete' icon={<DeleteIcon fontSize="small"/>}
											 disabled={!!state}/>
				</TableRow>
			)
		}))
}
AdminTableList.propTypes = {
	data: PropTypes.array.isRequired,
	deleteItem: PropTypes.func.isRequired,
};

export default AdminTableList
