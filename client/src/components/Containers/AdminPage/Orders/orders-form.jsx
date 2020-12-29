import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import FormFieldsGenerator from "../../../Common/form/form-fields-generator";
import {ControlledDatePicker} from "../../../Common/form/controlled-date-picker";
import {ControlledSelect} from "../../../Common/form/controlled-select";
import {BasicTableForm} from "../../../Common/form/basic-table-form";
import {formDispatchProps, formStateProps} from "../../utils/props-selector";
import {compose} from "redux";
import {connect} from "react-redux";
import {dateToRequest, getBeginEnd} from "../../../../middleware/utils/date-time-func";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "../../../../validation/admin-schema";


const subj = 'orders';
const mapStateToProps = formStateProps(subj);
const mapDispatchToProps = formDispatchProps(subj);

const OrdersForm = (props) => {
	const {data, handleReset, changeHours, accept} = props;
	const {fields, date, hours, begin} = data;

	const {register, handleSubmit, control, reset, watch, errors} = useForm({
		defaultValues: {
			master: fields.master[0],
			customer: fields.customer[0],
			service: fields.service[0],
			date: date,
			hours: begin
		},
		resolver: yupResolver(schema.orders),
	})


	const masterValue = watch('master').id;
	const dateValue = watch('date');
	const serviceValue = watch('service').time

	const disableHours = !(masterValue && serviceValue && dateValue)


	useEffect(() => {
		const normDate = dateToRequest(dateValue)

		if (!disableHours) {
			changeHours(masterValue, normDate, serviceValue, fields.id)
		}
	}, [masterValue, dateValue, serviceValue])

	const submitForm = (data) => {
		const {id, master, customer, service, date, hours} = data;
		// const {end, begin} = getBeginEnd(date, hours, service.time)
		//
		// const res = {
		// 	id,
		// 	master,
		// 	customer: customer.id,
		// 	service: service.id,
		//
		// }
		accept(data)
	}

	const formProps = {
		submit: handleSubmit((data) => submitForm(data)),
		reset: () => {
			handleReset()
			reset()
		},
	}
	const formFieldsProps = {data: fields, register, control, errors}
	const selectProps = {data: hours, control, defaultValue: hours[0].hour, name: 'hours', disabled: disableHours}

	return (
		<BasicTableForm {...formProps}>
			<FormFieldsGenerator {...formFieldsProps}/>
			<ControlledDatePicker control={control}/>
			<ControlledSelect {...selectProps}/>
		</BasicTableForm>

	)
}

export default compose(
	connect(mapStateToProps,
		mapDispatchToProps
	))(OrdersForm)