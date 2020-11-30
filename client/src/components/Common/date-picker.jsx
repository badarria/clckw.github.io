import React, {useState} from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


const DatePicker = (props) => {
	const {timestamp=new Date()} = props;
	const [selectedDate, handleDateChange] = useState(new Date(timestamp));

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				disableToolbar
				variant="inline"
				format="MM/dd/yyyy"
				margin="normal"
				id="date-picker-inline"
				label="Select day"
				disablePast
				value={selectedDate}
				onChange={handleDateChange}
				KeyboardButtonProps={{
					'aria-label': 'change date',
				}}
			/>
		</MuiPickersUtilsProvider>
	);
}


export default DatePicker;