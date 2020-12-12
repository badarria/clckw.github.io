import React from "react";
import {TableCell, TextField} from "@material-ui/core";
import PropTypes from "prop-types";
import {ControlledAutocompleteField} from "./controlled-autocomplete-field";


const FormFieldsGenerator = (props) => {
	const {data, register, control, state, errors, helper} = props
	const labels = Object.keys(data).filter(label => !label.match(/_id/));


	return (
		<>
			<TableCell/>
			{state === 'isCreating' ? <TableCell/> : null}
			{labels.map((label, inx) => {
				return (
					Array.isArray(data[label]) ?
						<ControlledAutocompleteField key={inx} control={control} name={label} data={data[label]}/> :
						<TextField
							style={{margin: '16px'}}
							defaultValue={data[label] || ''}
							label={label}
							name={label}
							inputProps={
								{
									readOnly: label === 'id',
								}
							}
							// error={!!errors[label]}
							// helperText={errors[label] || helper[label]}
							key={inx}
							size="small"
							required
							inputRef={register}
						/>
				)
			})}
		</>
	)
}

FormFieldsGenerator.propTypes = {
	data: PropTypes.object.isRequired,
	accept: PropTypes.func,
	cancel: PropTypes.func,
	state: PropTypes.any,
	// errors: PropTypes.object.isRequired,
	// helper: PropTypes.object.isRequired,
}


export default FormFieldsGenerator;