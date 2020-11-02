import React, {Fragment} from "react";
import {TableCell, Tooltip, IconButton} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from "prop-types";


const TableItem = (props) => {
	const {data, deleteItem, setDataToEdit, id} = props;


	return (
		<Fragment>
			{data.slice(1).map(([key, value]) => {
					return (
						<TableCell key={key} component="th">
							{value}
						</TableCell>
					)
				}
			)
			}

			<TableCell component="th">
				<Tooltip title="Edit">
					<IconButton aria-label="Edit">
						<EditIcon fontSize="small" onClick={() => setDataToEdit(data)}/>
					</IconButton>
				</Tooltip>
			</TableCell>
			<TableCell component="th" onClick={() => deleteItem(id)}>
				<Tooltip title="Delete">
					<IconButton aria-label="delete">
						<DeleteIcon fontSize="small"/>
					</IconButton>
				</Tooltip>
			</TableCell>
		</Fragment>
	)

}

TableItem.propTypes = {
	data: PropTypes.array.isRequired,
	deleteItem: PropTypes.func.isRequired,
};

export default TableItem