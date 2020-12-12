import {useForm} from "react-hook-form";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import FormFieldsGeneratorHook from "../../Common/form-fields-generator-hook";
import ButtonsGroupHook from "../../Common/buttons-group-hook";
import React from "react";


const MasterHeadForm = (props) => {
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

	return (
		<TableRow>
			<TableCell colSpan={11}>
				<form onSubmit={handleSubmit((data) => submitForm(data))}
							style={{display: 'flex', justifyContent: "space-between", width: '100%', alignItems: 'center'}}>
					<FormFieldsGeneratorHook data={data} register={register} control={control}/>
					<ButtonsGroupHook reset={() => {
						handleReset()
						reset()
					}}/>
				</form>
			</TableCell>
		</TableRow>
	)
}

export default MasterHeadForm