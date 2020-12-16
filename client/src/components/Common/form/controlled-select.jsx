import React from "react";
import { FormControl, Select, InputLabel, MenuItem, makeStyles} from "@material-ui/core";
import {Controller} from "react-hook-form";



const useStyles = makeStyles({
	root: {
		margin: '16px',
		minWidth: '80px'
	},
})

export const ControlledSelect = (props) => {
	const classes = useStyles()
	const {control, data, defaultValue, name = 'time', disabled = false} = props

	return (

		<FormControl className={classes.root}>
			<InputLabel htmlFor="trinity-select">
				Time
			</InputLabel>
			<Controller
				control={control}
				name={name}
				defaultValue={defaultValue}
				as={
					<Select id={name} disabled={disabled}>
						{data.map(({hour, booked}, inx) => (
							<MenuItem key={inx} value={hour} disabled={booked}>
								{hour}
							</MenuItem>
						))}
					</Select>
				}
			/>
		</FormControl>

	)
}

