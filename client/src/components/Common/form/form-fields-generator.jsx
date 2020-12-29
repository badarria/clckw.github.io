import React from "react";
import {TextField} from "@material-ui/core";
import PropTypes from "prop-types";
import {ControlledAutocomplete} from "./controlled-autocomplete";
import {useFieldStyles} from "../../styles/styles";




const FormFieldsGenerator = (props) => {
	const {data, register, control, errors, isSmall = true} = props
	const labels = Object.keys(data);
	const classes = useFieldStyles()

	return (
		<>
			{labels.map((label, inx) => {
				return (
					Array.isArray(data[label]) ?
						<ControlledAutocomplete key={inx} control={control} name={label} data={data[label]}/> :
						<TextField
							style={{margin: '16px'}}
							defaultValue={data[label] || ''}
							label={label}
							name={label}
							InputLabelProps={{className: classes.label}}
							inputProps={{
								readOnly: label === 'id',
								className: `${label === 'id' ? classes.idInput : null}
								 ${isSmall ? classes.smallInput : null}`,
							}}

							error={!!errors[label]}
							helperText={errors[label]?.message || ''}
							key={inx}
							size="small"
							autoComplete='nope'
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
}


export default FormFieldsGenerator;