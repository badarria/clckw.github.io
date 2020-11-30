import React from "react";
import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";
import {TableCell} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TableButton from "../table-button";
import AlertDialog from "../dialog-window";

const AdminTableListRedux = (props) => {
	const {del, data, columns, state, push} = props;


	return (
		data.map((item, indx) => {
			const id = item.id;

			return (
				<TableRow key={id} component='tr'>
					<TableCell component='td'>{indx + 1}</TableCell>
					{columns.map((key, i) => {
						return (
							<TableCell key={i}>{item[key]}</TableCell>
						)
					})}
					<TableButton handleClick={() => push(item, 'isEditing')} title='Edit' icon={<EditIcon fontSize="small"/>}
											 disabled={!!state}/>
					<AlertDialog acceptFunc={() => del(id)} title='Delete' icon={<DeleteIcon fontSize="small"/>}
											 disabled={!!state}/>
				</TableRow>
			)
		}))
}
AdminTableListRedux.propTypes = {
	data: PropTypes.array.isRequired,
	del: PropTypes.func.isRequired,
	state: PropTypes.any,
	columns: PropTypes.array,
	push: PropTypes.func.isRequired,
};

export default AdminTableListRedux
