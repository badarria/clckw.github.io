import React from 'react';
import {
	Paper,
	Box,
	makeStyles,
	Button,
} from "@material-ui/core";
import {useForm} from "react-hook-form";
import FormFieldsGenerator from "./form/form-fields-generator";


const useStyles = makeStyles({
	root: {
		padding: '30px',
		flexWrap: 'wrap',
		margin: '100px auto',
		width: '70%'
	},
	inputWrap: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	input: {
		width: '22%',
	},
	btnWrap: {
		margin: '30px 0 0',
		display: 'flex',
		justifyContent: 'center',
	},
	btn: {
		margin: '10px',
	}
});


export const MainSearchForm = (props) => {
	const classes = useStyles();
	const {find, fields, children,  } = props;
	const {register, handleSubmit, control, reset} = useForm({
		defaultValues: {
			name: '',
			surname: '',
			email: '',
			city: '',
			service: fields.service[0],
			date: data.date || new Date(),
			time: ''
		}
	})

	const fieldsProps = {data, register, control}

	return (
		<Box component={Paper} className={classes.root}>
			<form onSubmit={handleSubmit((data) => console.log(data))}>
				{children}
				<FormFieldsGenerator {...fieldsProps}/>
				<Box className={classes.btnWrap}>
					<Button type='submit' variant="contained" color="primary" className={classes.btn}>Find Master!</Button>
					<Button type='reset' variant="contained" className={classes.btn} onClick={clear}>Clear</Button>
				</Box>
			</form>
		</Box>
	)
}

