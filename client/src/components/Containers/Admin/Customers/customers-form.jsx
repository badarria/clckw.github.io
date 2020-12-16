import React from "react";
import {useForm} from "react-hook-form";
import FormFieldsGenerator from "../../../Common/form/form-fields-generator";
import {BasicTableForm} from "../../../Common/form/basic-table-form";
import {compose} from "redux";
import {connect} from "react-redux";
import {formDispatchProps, formStateProps} from "../../utils/props-selector";


const subj = 'customers'
const mapStateToProps = formStateProps(subj);
const mapDispatchToProps = formDispatchProps(subj);

const CustomersForm = ({data, handleReset, accept}) => {


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
		},
	}
	const formFieldsProps = {data, register, control,}

	return (
		<BasicTableForm {...formProps}>
			<FormFieldsGenerator {...formFieldsProps}/>
		</BasicTableForm>
	)
}


export default compose(connect(mapStateToProps,
	mapDispatchToProps
))(CustomersForm);
