import React from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Controller} from "react-hook-form";
import makeStyles from "@material-ui/core/styles/makeStyles";
import format from 'date-fns/format';
import {parseISO, toDate} from 'date-fns'
import { parse } from 'date-fns'

const {useState} = require("react");

const useStyles = makeStyles(() => ({
	formControl: {
		margin: '16px',
		maxWidth: '140px',
	}
}));

const ControlledDatePicker = (props) => {
	const {date, control, register, setValue, watch, getValues} = props;
	const classes = useStyles()

	// const handleChange = (data) => {
	// 	setValue('date', data);
	// }
	// React.useEffect(() => {
	// 	register("date");
	// }, [register])

	return (
		<Controller
			name="date"
			// defaultValue={parse('Wed Dec 16 2020 12:14:00 GMT+0200', "dd-MM-yy", new Date())}
			defaultValue={null}
			onChange={data => {
				setValue('date', data);
				// handleBlur(getValues().id, 'date'); //Managing patch save at server
				return {value: data} //important to update the controller value after change else state is updated and the controller will not render
			}}
			control={control}
			value={watch('date')}
			// onChange={([, data]) => {console.log(data)}}
			render={({onChange, value}) => (
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						className={classes.formControl}
						disableToolbar
						onChange={(data) => {
							console.log(data);
							return onChange(date)
							// return onChange(format(new Date(data), 'dd-MM-yy'))
						}}
						// inputValue={value}
						value={value}
						variant="inline"
						autoOk
						// initialFocusedDate='Wed Dec 16 2020 12:14:00 GMT+0200'
						format="dd-MM-yy"
						margin="normal"
						id="date-picker"
						label="Select day"
						disablePast
						{...props}
					/>
				</MuiPickersUtilsProvider>)}
		/>

	);
}


export default ControlledDatePicker;