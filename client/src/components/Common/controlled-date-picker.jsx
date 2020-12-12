import React from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Controller} from "react-hook-form";
import makeStyles from "@material-ui/core/styles/makeStyles";
import format from 'date-fns/format';
import { parseISO, toDate } from 'date-fns'

const useStyles = makeStyles(() => ({
	formControl: {
		margin: 0,
		maxWidth: '140px',
	}
}));

const ControlledDatePicker = (props) => {
	const {date, control, watch, setValue} = props;
	const classes = useStyles()

	return (
		<Controller
			name="date"
			defaultValue={date}
			// value={watch('date')}
			onChange={data => {
				setValue('date', data);
				// handleBlur(getValues().id, 'date'); //Managing patch save at server
				return {value: toDate(data)} //important to update the controller value after change else state is updated and the controller will not render
			}}
			control={control}

			// onChange={([, data]) => setValue('date', data)}
			render={({onChange, value}) => (
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						className={classes.formControl}
						disableToolbar
						onChange={(data) => {
							onChange(format(new Date(data), 'dd-MM-yyyy'))
						}}
						value={value}
						variant="inline"
						autoOk
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