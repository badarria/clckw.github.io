import {TableCell, TableRow, TextField} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import TableButton from "../table-button";
import {Done, Clear} from '@material-ui/icons';
import AutocompleteField from "./autocomplete-field";


const AdminTableHeaderEditing = (props) => {
	const {data, edit, push, cancel} = props
	const {dataToChange, errors, helper, state} = data;

	const labels = Object.keys(dataToChange).filter(label => !label.match(/_id/));


	return (
		<TableRow component='tr'>
			<TableCell/>
			{state === 'isAdding' ? <TableCell/> : null}
			{labels.map((label, i) => {
				return (
					<TableCell key={i}>
						{Array.isArray(dataToChange[label]) ?
							<AutocompleteField data={dataToChange[label]} label={label} edit={edit} helper={helper[label]}/> :
							<TextField
								value={dataToChange[label] || ''}
								onChange={(e) => edit(label, e.target.value)}
								label={label}
								disabled={label === 'id'}
								error={!!errors[label]}
								helperText={errors[label] || helper[label]}
								size="small"
							/>
						}
					</TableCell>
				)
			})}
			<TableButton handleClick={push} title='Edit'
									 icon={<Done fontSize="small"/>}/>
			<TableButton handleClick={cancel} title='Cancel' icon={<Clear fontSize="small"/>}/>
		</TableRow>
	)
}
AdminTableHeaderEditing.propTypes = {
	data: PropTypes.object.isRequired,
	edit: PropTypes.func.isRequired,
	add: PropTypes.func.isRequired,
	update: PropTypes.func.isRequired,
	cancel: PropTypes.func.isRequired,
}


export default AdminTableHeaderEditing;