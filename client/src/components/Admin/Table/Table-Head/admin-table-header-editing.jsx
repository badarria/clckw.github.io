import {TableCell, TableRow, TextField} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import TableButton from "../table-button";
import {Done, Clear} from '@material-ui/icons';


const AdminTableHeaderEditing = (props) => {
	const {state, data, edit, add, update, cancel} = props
	const labels = Object.keys(data);

	return (
		<TableRow component='tr'>
			<TableCell/>
			{state==='isAdding' ? <TableCell/> : null}
			{labels.map((label, i) => {
				return (
					<TableCell key={i}>
						<TextField type={label === "email" ? 'email' : 'text'}
											 value={data[label] || ''}
											 onChange={(e) => edit(label, e.target.value)}
											 label={label}
											 // required="true"
											 disabled={label === 'id'}
						/>
					</TableCell>
				)
			})}
			<TableButton handleClick={state === 'isAdding' ? add : update} title='Edit'
									 icon={<Done fontSize="small"/>}/>
			<TableButton handleClick={cancel} title='Cancel' icon={<Clear fontSize="small"/>}/>
		</TableRow>
	)
}
AdminTableHeaderEditing.propTypes = {
	state: PropTypes.string,
	data: PropTypes.object.isRequired,
	edit: PropTypes.func.isRequired,
	add: PropTypes.func.isRequired,
	update: PropTypes.func.isRequired,
	cancel: PropTypes.func.isRequired,
}



export default AdminTableHeaderEditing;