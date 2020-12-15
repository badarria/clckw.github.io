import React from 'react';
import {
	Paper,
	Box,
	makeStyles,
	Button,
} from "@material-ui/core";
import {useForm} from "react-hook-form";
import FormFieldsGenerator from "../../Common/form/form-fields-generator";
import {compose} from "redux";
import {connect} from "react-redux";
import {getFormDataState} from "../../../middleware/state-selectors";
import {changeHours, checkCustomer, findMasters, getInitState, setOrderData} from "../../../middleware/thunks";
import ControlledDatePicker from "../../Common/form/controlled-date-picker";
import {ControlledSelect} from "../../Common/form/controlled-select";
import {DateTime} from "luxon";

const {useEffect} = require("react");

const useStyles = makeStyles({
	root: {
		padding: '30px',
		flexWrap: 'wrap',
		margin: '50px auto',
		width: '70%'
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	input: {
		width: '29%',
	},
	wrap: {
		margin: '30px 0 0',
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	btn: {
		margin: '10px',
	}
});

export const MainSearchForm = (props) => {
	const {data, initState, changeHours, findMasters, checkCustomer, setOrderData} = props
	const classes = useStyles();
	const {fields, hours} = data;
	const dateObj = DateTime.fromJSDate(new Date()).startOf('day').toJSDate();

	useEffect(() => {
		initState()
	}, [])

	const {register, handleSubmit, control, reset, watch, setValue} = useForm({
		defaultValues: {
			name: '',
			surname: '',
			email: '',
			city: '',
			service: '',
			date: dateObj,
			hours: ''
		}
	})
	const service = watch('service');

	useEffect(() => {
		changeHours(service.time)
	}, [service])

	const fieldsProps = {data: fields, register, control}

	const submit = (data) => {
		const {name, surname, email, service, city, date, hours} = data;
		const begin = DateTime.fromJSDate(date).plus({hours: hours.split(':')[0]}).toHTTP();
		const interval = Number(service.time)
		const end = DateTime.fromHTTP(begin).plus({hours: interval}).toHTTP();
		findMasters({city: city.id, begin, end})
		setOrderData({service:service.id, begin, end})
		checkCustomer({name, surname, email})
	}


	return (
		<Box component={Paper} className={classes.root}>
			<form onSubmit={handleSubmit((data) => submit(data))} className={classes.form}>
				<Box className={classes.wrap}>
					<FormFieldsGenerator {...fieldsProps}/>
					<ControlledDatePicker control={control} watch={watch} setValue={setValue}/>
					<ControlledSelect control={control} data={hours || []} name='hours'/>
				</Box>
				<Box className={classes.wrap}>
					<Button type='submit' variant="contained" color="primary" className={classes.btn}>Find Master</Button>
					<Button type='reset' variant="contained" className={classes.btn}>Clear</Button>
				</Box>
			</form>
		</Box>
	)
}

const mapStateToProps = (state) => ({
	data: getFormDataState(state),
})

const mapDispatchToProps = (dispatch) => {
	return {
		initState: () => dispatch(getInitState),
		changeHours: (service_time) => dispatch(changeHours(service_time)),
		findMasters: (data) => dispatch(findMasters(data)),
		checkCustomer: (data) => dispatch(checkCustomer(data)),
		setOrderData: (data) => dispatch(setOrderData(data))
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps))(MainSearchForm);