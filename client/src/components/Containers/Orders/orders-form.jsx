import {useForm} from "react-hook-form";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import FormFieldsGeneratorHook from "../../Common/form-fields-generator-hook";
import ControlledDatePicker from "../../Common/controlled-date-picker";
import {ControlledSelect} from "../../Common/controlled-select";
import ButtonsGroupHook from "../../Common/buttons-group-hook";
import React, {useEffect} from "react";


const OrderHeadForm = (props) => {
	const {fields, date, time, handleReset, changeHours, accept} = props

	const {register, handleSubmit, control, reset, watch, setValue, getValues} = useForm({
		defaultValues: {
			master: fields.master[0],
			customer: fields.customer[0],
			service: fields.service[0],
			date: date || null,
			time: time[0].hour || ''
		}
	})


	const masterValue = watch('master').id;
	const dateValue = watch('date');
	const serviceValue = watch('service').time

	const disableHours = !(masterValue && serviceValue && dateValue)


	useEffect(() => {
		if (!disableHours) {
			changeHours(masterValue, dateValue, serviceValue, fields.id)
		}
	}, [masterValue, dateValue, serviceValue])

	const submitForm = (data) => {
		const {id, master, customer, service, date, time} = data
		const res = {
			id: id,
			master: master.id,
			customer: customer.id,
			service: service.id,
			date: date.replace(/[a-z ]/g, ''),
			begin: time,
			end: `${Number(time.slice(0, 2))+Number(service.time)}:00`
		}
		accept(res)
	}

	return (
		<TableRow>
			<TableCell colSpan={11}>
				<form onSubmit={handleSubmit((data) => submitForm(data))}
							style={{display: 'flex', justifyContent: "space-between", width: '100%', alignItems: 'center'}}>
					<FormFieldsGeneratorHook data={fields} register={register} control={control}/>
					<ControlledDatePicker date={date} control={control} setValue={setValue} watch={watch} getValues={getValues}/>
					<ControlledSelect data={time} control={control} disabled={disableHours}
														defaultValue={time[0].hour}/>
					<ButtonsGroupHook reset={() => {
						handleReset()
						reset()
					}}/>
				</form>
			</TableCell>
		</TableRow>
	)
}

export default OrderHeadForm