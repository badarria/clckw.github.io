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
import {changeHours, findMasters, getInitState} from "../../../middleware/thunks";
import ControlledDatePicker from "../../Common/form/controlled-date-picker";
import {ControlledSelect} from "../../Common/form/controlled-select";

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

export const MainSearchForm = ({data, initState, changeHours, findMasters}) => {
	const classes = useStyles();
	const {fields, date, hours} = data;

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
			date: date,
			hours: ''
		}
	})
	const service = watch('service');

	useEffect(() => {
		changeHours(service.time)
	}, [service])

	const fieldsProps = {data: fields, register, control}

	const submit = (data) => {
		findMasters(data)
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
					<Button type='submit' variant="contained" color="primary" className={classes.btn}>Find Master!</Button>
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
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps))(MainSearchForm);