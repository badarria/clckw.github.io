import React from 'react';
import {TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Controller} from "react-hook-form";
import {useAutocompleteStyle} from "../../styles/styles";


export const ControlledAutocomplete = (props) => {
	const {data, control, name} = props
	const classes = useAutocompleteStyle();


	return (
		<Controller
			control={control}
			name={name}
			render={({onChange}) =>
				<Autocomplete
					className={classes.root}
					defaultValue={data[0]}
					disableClearable
					filterOptions={(data) => data.filter(opt => opt.name)}
					getOptionLabel={(option) => option.name}
					options={data}
					getOptionSelected={(option, value) => option.name === value.name}
					onChange={(event, newValue) => onChange(newValue)}
					renderInput={(params) => (
						<TextField {...params} label={name} autoComplete='nope' InputLabelProps={{className: classes.label}}
											 required/>
					)}
				/>
			}
		/>
	)
}