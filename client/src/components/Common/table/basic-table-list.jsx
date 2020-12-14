import React from "react";
import PropTypes from "prop-types";
import {TableCell, TableRow} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AlertDialog from "../alert-dialog";
import {ButtonIcon} from "../button-icon";


const BasicTableList = (props) => {
	const {remove, data, columns, editState, push} = props;


	return (
		data.map((item, inx) => {
			const id = item.id;

			const buttonProps = {
				title: !!editState ? "You have to submit form first" : "Edit item",
				disabled: !!editState,
				icon: <EditIcon fontSize="small"/>
			}
			const alertProps = {
				title: !!editState ? "You have to submit form first" : 'Remove item',
				icon: <DeleteIcon fontSize="small"/>,
				disabled: !!editState
			}

			return (
				<TableRow key={id} component='tr'>
					<TableCell component='td'>{inx + 1}</TableCell>
					{columns.map((key, i) => {
						return (
							<TableCell key={i}>{item[key]}</TableCell>
						)
					})}
					<TableCell align='right'>
						<ButtonIcon {...buttonProps} onClick={() => push(item, 'isEditing')}/>
					</TableCell>
					<TableCell align='right'>
						<AlertDialog {...alertProps} accept={() => remove(id)}/>
					</TableCell>
				</TableRow>
			)
		}))
}
BasicTableList.propTypes = {
	data: PropTypes.array.isRequired,
	remove: PropTypes.func.isRequired,
	editState: PropTypes.any,
	columns: PropTypes.array,
	push: PropTypes.func.isRequired,
};

export default BasicTableList
