import React from "react";
import {useForm} from "react-hook-form";
import FormFieldsGenerator from "../../../Common/form/form-fields-generator";
import {BasicTableForm} from "../../../Common/form/basic-table-form";
import {compose} from "redux";
import {connect} from "react-redux";
import {formDispatchProps, formStateProps} from "../../utils/props-selector";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "../../../../validation/admin-schema";


const subj = 'masters'
const mapStateToProps = formStateProps(subj);
const mapDispatchToProps = formDispatchProps(subj);


const MastersForm = ({data, handleReset, accept}) => {

	const {register, handleSubmit, control, reset, errors} = useForm({
		defaultValues: {
			name: data.name,
			surname: data.surname,
			city: data.city[0],
		}, resolver: yupResolver(schema.masters),
	})


	const formProps = {
		submit: handleSubmit((data) => accept(data)),
		reset: () => {
			handleReset()
			reset()
		},
	}
	const formFieldsProps = {data, register, control, errors}

	return (
		<BasicTableForm {...formProps}>
			<FormFieldsGenerator {...formFieldsProps}/>
		</BasicTableForm>
	)
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(MastersForm)
