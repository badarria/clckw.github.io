import React from "react";
import {useForm} from "react-hook-form";
import FormFieldsGenerator from "../../../Common/form/form-fields-generator";
import {BasicTableForm} from "../../../Common/form/basic-table-form";
import {compose} from "redux";
import {connect} from "react-redux";
import {formDispatchProps, formStateProps} from "../../utils/props-generator";

const subj = 'masters'
const mapStateToProps = formStateProps(subj);
const mapDispatchToProps = formDispatchProps(subj);


const MastersForm = (props) => {
	const {data, handleReset, accept} = props

	const {register, handleSubmit, control, reset} = useForm({
		defaultValues: {
			name: data.name,
			surname: data.surname,
			city: data.city,
			rating: data.rating,
		}
	})

	const submitForm = (data) => {
		const {id, name, surname, city, rating} = data
		const res = {id, name, surname, city: city.id, rating,}
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(MastersForm)
