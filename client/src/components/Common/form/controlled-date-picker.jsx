import React from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Controller} from "react-hook-form";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
	root: {
		margin: '16px',
		maxWidth: '140px',
		minWidth: '100px'
	}
});

export const ControlledDatePicker = (props) => {
	const {control,} = props;
	const classes = useStyles()

	return (
		<Controller
			name="date"
			control={control}
			render={({onChange, value}) => (
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						className={classes.root}
						disableToolbar
						required
						onChange={(data) => onChange(data)}
						value={value}
						variant="inline"
						autoOk
						format="dd/MM/yy"
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
