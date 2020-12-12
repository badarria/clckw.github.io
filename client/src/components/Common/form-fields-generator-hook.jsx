import {TableCell, TableRow, TextField} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import TableButton from "../Common/table-button";
import {Done, Clear} from '@material-ui/icons';
import AutocompleteField from "../Common/autocomplete-field";
import {Controller} from "react-hook-form";
import AutocompleteFieldHook from "./autocomplete-field-hook";


const FormFieldsGeneratorHook = (props) => {
	const {data, edit, register, control, state, errors, helper, setValue} = props
	const labels = Object.keys(data).filter(label => !label.match(/_id/));

	return (
		<>
			<TableCell/>
			{state === 'isCreating' ? <TableCell/> : null}
			{labels.map((label, i) => {
				return (
					Array.isArray(data[label]) ?
						<Controller
							key={i}
							name={label}
							control={control}
							render={(props) => (
								<AutocompleteFieldHook data={data[label]} label={label} {...props}/>)}
						/> :
						<TextField
							style={{margin: '16px'}}
							defaultValue={data[label] || ''}
							label={label}
							name={label}
							inputProps={
								{readOnly: label === 'id',
								}
							}
							// error={!!errors[label]}
							// helperText={errors[label] || helper[label]}
							key={i}
							size="small"
							required
							inputRef={register}
						/>

				)
			})}
		</>
	)
}
// FormFieldsGeneratorHook.propTypes = {
// 	formProps: PropTypes.shape({
// 		data: PropTypes.object.isRequired,
// 		edit: PropTypes.func,
// 		accept: PropTypes.func,
// 		cancel: PropTypes.func,
// 		state: PropTypes.any,
// 		errors: PropTypes.object.isRequired,
// 		helper: PropTypes.object.isRequired,
// 	}),
// }


export default FormFieldsGeneratorHook;