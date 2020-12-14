import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import FormFieldsGenerator from "../../../Common/form/form-fields-generator";
import ControlledDatePicker from "../../../Common/form/controlled-date-picker";
import {ControlledSelect} from "../../../Common/form/controlled-select";
import {BasicTableForm} from "../../../Common/form/basic-table-form";
import {formDispatchProps, formStateProps} from "../../utils/props-generator";
import {compose} from "redux";
import {connect} from "react-redux";

const subj = 'orders';
const mapStateToProps = formStateProps(subj);
const mapDispatchToProps = formDispatchProps(subj);

const OrdersForm = (props) => {
	const {data, handleReset, changeHours, accept} = props;
	const {fields, date, hours} = data;

	const {register, handleSubmit, control, reset, watch, setValue, getValues} = useForm({
		defaultValues: {
			master: fields.master[0],
			customer: fields.customer[0],
			service: fields.service[0],
			date: date || null,
			hours: hours[0].hour || ''
		},
		shouldUnregister: false,
	})


	const masterValue = watch('master').id;
	const dateValue = watch('date');
	const serviceValue = watch('service').time

	const disableHours = !(masterValue && serviceValue && dateValue)


	useEffect(() => {
		console.log(masterValue, dateValue, serviceValue)
		if (!disableHours) {
			changeHours(masterValue, dateValue, serviceValue, fields.id)
		}
	}, [masterValue, dateValue, serviceValue])

	const submitForm = (data) => {
		console.log('subm')
		const {id, master, customer, service, date, hours} = data
		const res = {
			id: id,
			master: master.id,
			customer: customer.id,
			service: service.id,
			date: date.replace(/[a-z ]/g, ''),
			begin: hours,
			end: `${Number(hours.slice(0, 2)) + Number(service.time)}:00`
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

	return (
		<BasicTableForm {...formProps}>
			<FormFieldsGenerator {...formFieldsProps}/>
			<ControlledDatePicker date={date} control={control} setValue={setValue} watch={watch} getValues={getValues}/>
			<ControlledSelect data={hours} control={control} disabled={disableHours}
												defaultValue={hours[0].hour}/>
		</BasicTableForm>

	)
}

export default compose(
	connect(mapStateToProps,
		mapDispatchToProps
	))(OrdersForm)