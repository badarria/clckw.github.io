import React from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Controller} from "react-hook-form";
import {usePickerStyles} from "../../styles/styles";


export const ControlledDatePicker = (props) => {
	const {control,} = props;
	const classes = usePickerStyles()

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
