import React from "react";
import {useForm} from "react-hook-form";
import FormFieldsGenerator from "../../../Common/form/form-fields-generator";
import {BasicTableForm} from "../../../Common/form/basic-table-form";
import {compose} from "redux";
import {connect} from "react-redux";
import {formDispatchProps, formStateProps} from "../../utils/props-selector";


const subj = 'masters'
const mapStateToProps = formStateProps(subj);
const mapDispatchToProps = formDispatchProps(subj);


const MastersForm = ({data, handleReset, accept}) => {


	const {register, handleSubmit, control, reset} = useForm({
		defaultValues: {
			name: data.name,
			surname: data.surname,
			city: data.city[0],
		}
	})

	const submitForm = (data) => {
		const {id, name, surname, city} = data
		const res = {id, name, surname, city: city.id}
		accept(res)
	}

	const formProps = {
		submit: handleSubmit((data) => submitForm(data)),
		reset: () => {
			handleReset()
			reset()
		},
	}
	const formFieldsProps = {data, register, control}

	return (
		<BasicTableForm {...formProps}>
			<FormFieldsGenerator {...formFieldsProps}/>
		</BasicTableForm>
	)
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(MastersForm)
