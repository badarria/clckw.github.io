import React from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Controller} from "react-hook-form";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles(() => ({
	formControl: {
		margin: '16px',
		maxWidth: '140px',
	}
}));

const ControlledDatePicker = (props) => {
	const {date, control, watch,} = props;
	const classes = useStyles()


	return (
		<Controller
			name="date"
			defaultValue={date || new Object()}
			control={control}
			value={watch('date')}
			render={({onChange, value}) => (
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						className={classes.formControl}
						disableToolbar
						onChange={(data) => onChange(data)}
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