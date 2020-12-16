import React from 'react';
import {TextField, makeStyles} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Controller} from "react-hook-form";

const useStyle = makeStyles({
	root: {margin: '16px', minWidth: '130px'},
	label: {textTransform: 'Capitalize'}
})

export const ControlledAutocomplete = (props) => {
	const {data, control, name} = props
	const classes = useStyle();
	// const options = data.filter(({name}) => name)

	return (
		<Controller
			control={control}
			name={name}
			render={({onChange}) =>
				<Autocomplete
					className={classes.root}
					defaultValue={data[0]}
					disableClearable
					getOptionLabel={(option) => option.name}
					options={data}
					getOptionSelected={(option, value) => option.name === value.name}
					onChange={(event, newValue) => onChange(newValue)}
					renderInput={(params) => (
						<TextField {...params} label={name} autoComplete='nope' InputLabelProps={{className: classes.label}}/>
					)}
				/>
			}
		/>
	)
}