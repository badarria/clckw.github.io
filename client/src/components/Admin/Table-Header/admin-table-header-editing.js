import {TableCell, TableRow, TextField} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import TableButton from "../table-button";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";


const AdminTableHeaderEditing = (props) => {
	const {state, dataToChange, editItem, addItem, updateItem, cancelInput} = props
	const labels = Object.keys(dataToChange);

	return (
		<TableRow component='tr'>
			<TableCell/>
			{state==='isAdding' ? <TableCell/> : null}
			{labels.map((label, i) => {
				return (
					<TableCell key={i}>
						<TextField type={label === "email" ? 'email' : 'text'}
											 value={dataToChange[label] || ''}
											 onChange={(e) => editItem(label, e.target.value)}
											 label={label}
											 required="true"
											 disabled={label === 'id'}
						/>
					</TableCell>
				)
			})}
			<TableButton handleClick={state === 'isAdding' ? addItem : updateItem} title='Edit'
									 icon={<DoneIcon fontSize="small"/>}/>
			<TableButton handleClick={cancelInput} title='Cancel' icon={<ClearIcon fontSize="small"/>}/>
		</TableRow>
	)
}
AdminTableHeaderEditing.propTypes = {
	state: PropTypes.string,
	dataToChange: PropTypes.object.isRequired,
	editItem: PropTypes.func.isRequired,
	addItem: PropTypes.func.isRequired,
	updateItem: PropTypes.func.isRequired,
	cancelInput: PropTypes.func.isRequired,
}



export default AdminTableHeaderEditing;