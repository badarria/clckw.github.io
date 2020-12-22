import React from 'react';
import {Paper, Box, Button,} from "@material-ui/core";
import {useForm} from "react-hook-form";
import FormFieldsGenerator from "../../Common/form/form-fields-generator";
import {compose} from "redux";
import {connect} from "react-redux";
import {getFormDataState} from "../../../middleware/state-selectors";
import {
	changeHours,
	checkCustomer,
	findMasters,
	getInitState,
	setOrderData
} from "../../../middleware/home-page-thunks";
import {ControlledDatePicker} from "../../Common/form/controlled-date-picker";
import {ControlledSelect} from "../../Common/form/controlled-select";
import {makeStyles} from "@material-ui/core/styles";
import {getBeginEnd} from "../../../middleware/utils/date-time-func";


export const useStyles = makeStyles({
	container: {
		padding: '30px',
		flexWrap: 'wrap',
		margin: '50px auto',
		// width: '70%'
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	wrap: {
		margin: '30px 0 0',
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	btn: {
		margin: '10px',
	},
});


const {useEffect} = require("react");


export const MainSearchForm = (props) => {
	const classes = useStyles();
	const {data, initState, changeHours, findMasters, checkCustomer, setOrderData} = props
	const {fields, date, hours} = data;


	useEffect(() => {
		initState()
	}, [])

	const defaultValues = {
		name: null,
		surname: '',
		email: '',
		city: '',
		service: '',
		date: date,
		hours: '',
	}

	const {register, handleSubmit, control, reset, watch} = useForm({defaultValues})
	const service = watch('service');

	useEffect(() => {
		changeHours(service.time)
	}, [service])

	const fieldsProps = {data: fields, register, control, classes}

	const submit = async (data) => {
		const {name, surname, email, service, city, date, hours} = data;
		const {end, begin} = getBeginEnd(date, hours, service.time);
		const res = await findMasters({city: city.id, begin, end})
		if (res) {
			setOrderData({service: service.id, begin, end})
			checkCustomer({name, surname, email})
			reset(defaultValues)
		}
	}


	return (
		<Paper className={classes.container}>
			<form onSubmit={handleSubmit((data) => submit(data))} className={classes.form}>
				<Box className={classes.wrap}>
					<FormFieldsGenerator {...fieldsProps}/>
					<ControlledDatePicker control={control}/>
					<ControlledSelect control={control} data={hours || []} name='hours'/>
				</Box>
				<Box className={classes.wrap}>
					<Button type='reset' variant="contained" className={classes.btn}
									onClick={() => reset({...defaultValues})}>Clear</Button>
					<Button type='submit' variant="contained" color="primary" className={classes.btn}>Find Master</Button>
				</Box>
			</form>
		</Paper>
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