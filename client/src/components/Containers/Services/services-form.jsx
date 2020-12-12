import React from "react";
import {useForm} from "react-hook-form";
import FormFieldsGenerator from "../../Common/form/form-fields-generator";
import {BasicTableForm} from "../../Common/form/basic-table-form";


const ServicesForm = (props) => {
	const {data, handleReset, accept} = props

	const {register, handleSubmit, control, reset} = useForm({
		defaultValues: {
			name: data.name,
			time: data.time,
		}
	})


	const submitForm = (data) => {
		const {id, name, time} = data
		const res = {id, name, time}
		accept(res)
	}

	const formProps = {
		submit: handleSubmit((data) => submitForm(data)),
		reset: () => {
			handleReset()
			reset()
		}
	}
	const formFieldsProps = {data, register, control}

	return (
		<BasicTableForm {...formProps}>
			<FormFieldsGenerator {...formFieldsProps}/>
		</BasicTableForm>
	)
}

export default ServicesForm