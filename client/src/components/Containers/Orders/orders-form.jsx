import {useForm, useWatch} from "react-hook-form";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import FormFieldsGeneratorHook from "../../Common/form-fields-generator-hook";
import ControlledDatePicker from "../../Common/controlled-date-picker";
import {ControlledSelect} from "../../Common/controlled-select";
import ButtonsGroupHook from "../../Common/buttons-group-hook";
import React, {useEffect} from "react";
import format from 'date-fns/format';
import { parseISO } from 'date-fns'

const OrderHeadForm = (props) => {
	const {fields, date, time, handleReset, changeHours} = props

	const {register, handleSubmit, control, reset, watch, setValue} = useForm({
		defaultValues: {
			master: fields.master[0],
			customer: fields.customer[0],
			service: fields.service[0],
			date: date || null,
			time: time[0].hour||''
		}
	})


	const masterValue = watch('master').id;
	const dateValue = watch('date');
	const serviceValue = watch('service').time

	const disableHours = !(masterValue && serviceValue && dateValue)


	useEffect(() => {
		if (!disableHours) {
			console.log(masterValue, dateValue, serviceValue, fields.id)
			changeHours(masterValue, dateValue, serviceValue, fields.id)
		}
	}, [masterValue, dateValue, serviceValue])



	return (
		<TableRow>
			<TableCell colSpan={11}>
				<form onSubmit={handleSubmit((fields) => console.log(fields))}
							style={{display: 'flex', justifyContent: "space-between", width: '100%', alignItems: 'center'}}>
					<FormFieldsGeneratorHook data={fields} register={register} control={control}/>
					<ControlledDatePicker date={date} control={control} setValue={setValue} watch={watch}/>
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