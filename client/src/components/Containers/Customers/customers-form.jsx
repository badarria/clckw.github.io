import React from "react";
import {useForm} from "react-hook-form";
import FormFieldsGenerator from "../../Common/form/form-fields-generator";
import {BasicTableForm} from "../../Common/form/basic-table-form";


const CustomersForm = (props) => {
	const {data, handleReset, accept} = props

	const {register, handleSubmit, control, reset} = useForm({
		defaultValues: {
			name: data.name,
			surname: data.surname,
			email: data.email
		}
	})

	const submitForm = (data) => {
		const {id, name, surname, email} = data
		const res = {id, name, surname, email}
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

export default CustomersForm