import React from "react";
import {useForm} from "react-hook-form";
import FormFieldsGenerator from "../../../Common/form/form-fields-generator";
import {BasicTableForm} from "../../../Common/form/basic-table-form";
import {compose} from "redux";
import {connect} from "react-redux";
import {formDispatchProps, formStateProps} from "../../utils/props-selector";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "../../../../validation/admin-schema";


const subj = 'services'
const mapStateToProps = formStateProps(subj);
const mapDispatchToProps = formDispatchProps(subj);

const ServicesForm = ({data, handleReset, accept}) => {

	const {register, handleSubmit, control, reset, errors} = useForm({
		defaultValues: {
			name: data.name,
			time: data.time,
		}, resolver: yupResolver(schema.services),
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
	const formFieldsProps = {data, register, control,errors}

	return (
		<BasicTableForm {...formProps}>
			<FormFieldsGenerator {...formFieldsProps}/>
		</BasicTableForm>
	)
}


export default compose(
	connect(mapStateToProps,
		mapDispatchToProps
	))(ServicesForm)