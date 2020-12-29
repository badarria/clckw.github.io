import React, {useEffect} from 'react';
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
} from "../../../middleware/home/home-page-thunks";
import {ControlledDatePicker} from "../../Common/form/controlled-date-picker";
import {ControlledSelect} from "../../Common/form/controlled-select";
import {yupResolver} from '@hookform/resolvers/yup';
import {schema} from '../../../validation/home-schema'
import {useSearchFormStyles} from "../../styles/styles";


export const MainSearchForm = (props) => {
	const classes = useSearchFormStyles();
	const {data, initState, changeHours, findMasters, checkCustomer, setOrderData} = props
	const {fields, date, hours} = data;


	useEffect(() => {
		initState()
	}, [])


	const defaultValues = {
		name: '',
		surname: '',
		email: '',
		city: '',
		service: '',
		date: date,
		hours: '',
	}


	const {register, handleSubmit, control, watch, errors} = useForm({
		resolver: yupResolver(schema.form),
		defaultValues
	})
	const service = watch('service');


	useEffect(() => {
		changeHours(service.time)
	}, [service])


	const fieldsProps = {data: fields, register, control, classes, errors}

	const submit = async (data) => {
		const {name, surname, email, service, city, date, hours} = data;
		const res = await findMasters({city, date, service, hours})
		if (res) {
			setOrderData({service, date, hours, city})
			checkCustomer({name, surname, email})
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