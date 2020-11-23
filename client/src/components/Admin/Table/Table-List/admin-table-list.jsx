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
	const {del, data, columns, state, pushItemToEdit} = props;


	return (
		data.map((item, indx) => {
			const id = item.id;

			return (
				<TableRow key={id} component='tr'>
					<TableCell component='td'>{indx + 1}</TableCell>
					<AdminTableListItem data={item} columns={columns}/>
					<TableButton handleClick={() => pushItemToEdit(item)} title='Edit' icon={<EditIcon fontSize="small"/>}
											 disabled={!!state}/>
					<AlertDialog acceptFunc={() => del(id)} title='Delete' icon={<DeleteIcon fontSize="small"/>}
											 disabled={!!state}/>
				</TableRow>
			)
		}))
}
AdminTableList.propTypes = {
	data: PropTypes.array.isRequired,
	del: PropTypes.func.isRequired,
	pushItemToEdit: PropTypes.func.isRequired,
};

export default AdminTableList
