import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import FormFieldsGenerator from "../../../Common/form/form-fields-generator";
import ControlledDatePicker from "../../../Common/form/controlled-date-picker";
import {ControlledSelect} from "../../../Common/form/controlled-select";
import {BasicTableForm} from "../../../Common/form/basic-table-form";
import {formDispatchProps, formStateProps} from "../../utils/props-generator";
import {compose} from "redux";
import {connect} from "react-redux";
import {DateTime} from "luxon";

const subj = 'orders';
const mapStateToProps = formStateProps(subj);
const mapDispatchToProps = formDispatchProps(subj);

const OrdersForm = (props) => {
	const {data, handleReset, changeHours, accept} = props;
	const {fields, date, hours} = data;

	const dateObj = date ? DateTime.fromFormat(date, 'EEE dd/MM/yyyy').toJSDate() :
		DateTime.fromJSDate(new Date()).startOf('day').toJSDate();


	const {register, handleSubmit, control, reset, watch,} = useForm({
		defaultValues: {
			master: fields.master[0],
			customer: fields.customer[0],
			service: fields.service[0],
			date: dateObj,
			hours: hours[0].hour
		},
		shouldUnregister: false,
	})


	const masterValue = watch('master').id;
	const dateValue = watch('date');
	const serviceValue = watch('service').time

	const disableHours = !(masterValue && serviceValue && dateValue)


	useEffect(() => {
		const normDate = DateTime.fromJSDate(dateValue).toLocaleString()
		if (!disableHours) {
			changeHours(masterValue, normDate, serviceValue, fields.id)
		}
	}, [masterValue, dateValue, serviceValue])

	const submitForm = (data) => {
		const {id, master, customer, service, date, hours} = data;
		const begin = DateTime.fromJSDate(date).plus({hours: hours.split(':')[0]}).toHTTP();
		const interval = Number(service.time)
		const end = DateTime.fromHTTP(begin).plus({hours: interval}).toHTTP();
		const res = {
			id: id,
			master: master.id,
			customer: customer.id,
			service: service.id,
			begin,
			end,
		}
		accept(res)
	}

	const formProps = {
		submit: handleSubmit((data) => submitForm(data)),
		reset: () => {
			handleReset()
			reset()
		}
	}
	const formFieldsProps = {data: fields, register, control}
	const datePickerProps = {date: dateObj, control, watch}
	const selectProps = {data: hours, control, defaultValue: hours[0].hour, name: 'hours', disabled: disableHours}

	return (
		<BasicTableForm {...formProps}>
			<FormFieldsGenerator {...formFieldsProps}/>
			<ControlledDatePicker {...datePickerProps}/>
			<ControlledSelect {...selectProps}/>
		</BasicTableForm>

	)
}

export default compose(
	connect(mapStateToProps,
		mapDispatchToProps
	))(OrdersForm)