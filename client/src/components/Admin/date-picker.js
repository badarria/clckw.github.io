import React, {useState} from "react";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


const DatePicker = (props) => {
	const {timestamp} = props;
	const [selectedDate, handleDateChange] = useState(new Date(timestamp));

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<DateTimePicker
				variant="inline"
				label="Select day and time"
				value={selectedDate}
				onChange={handleDateChange}
				minutesStep={30}
				ampm={false}
				format="yyyy/MM/dd HH:mm"
				disablePast
			/>

		</MuiPickersUtilsProvider>
	);
}


export default DatePicker;