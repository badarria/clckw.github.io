import {TableCell, TableRow, TextField} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import TableButton from "../Common/table-button";
import {Done, Clear} from '@material-ui/icons';
import AutocompleteField from "../Common/autocomplete-field";


const BasicTableHeadForm = (props) => {
	const {data, edit, accept, cancel, state, errors, helper} = props.formProps
	const labels = Object.keys(data).filter(label => !label.match(/_id/));


	return (
		<TableRow component='tr'>
			<TableCell/>
			{state === 'isCreating' ? <TableCell/> : null}
			{labels.map((label, i) => {
				return (
					<TableCell key={i}>
						{Array.isArray(data[label]) ?
							<AutocompleteField data={data[label]} label={label} edit={edit} helper={helper[label]}/> :
							<TextField
								value={data[label] || ''}
								onChange={(e) => edit(label, e.target.value)}
								label={label}
								disabled={label === 'id'}
								error={!!errors[label]}
								helperText={errors[label] || helper[label]}
								size="small"
								required
							/>
						}
					</TableCell>
				)
			})}
			<TableButton handleClick={() => accept(data)} title='Accept'
									 icon={<Done fontSize="small"/>}/>
			<TableButton handleClick={() => cancel()} title='Cancel' icon={<Clear fontSize="small"/>}/>
		</TableRow>
	)
}
BasicTableHeadForm.propTypes = {
	formProps: PropTypes.shape({
		data: PropTypes.object.isRequired,
		edit: PropTypes.func,
		accept: PropTypes.func,
		cancel: PropTypes.func,
		state: PropTypes.any,
		errors: PropTypes.object.isRequired,
		helper: PropTypes.object.isRequired,
	}),
}


export default BasicTableHeadForm;