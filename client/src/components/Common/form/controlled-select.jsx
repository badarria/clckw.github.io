import React from "react";
import {FormControl, Select, InputLabel, MenuItem} from "@material-ui/core";
import {Controller} from "react-hook-form";


const ControlledSelect = (props) => {
	const {control, data, disabled, defaultValue} = props

	return (
		<FormControl style={{margin: '16px', minWidth: '100px'}}>
			<InputLabel htmlFor="trinity-select">
				Time
			</InputLabel>
			<Controller
				control={control}
				name="time"
				defaultValue={defaultValue}
				as={
					<Select id="time" disabled={disabled} >
						{data.map(({hour, booked}, inx) => (
							<MenuItem key={inx} value={hour} disabled={booked}>
								{hour}
							</MenuItem>
						))}
					</Select>
				}
			/>
		</FormControl>
	);
}

export {ControlledSelect}