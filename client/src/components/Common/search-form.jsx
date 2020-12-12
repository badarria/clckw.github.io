import React, {useState} from 'react';
import {
	Paper,
	Box,
	makeStyles,
	Button,
	FormControl,
	TextField
} from "@material-ui/core";
// import AutocompleteField from "./controlled-autocomplete-field";

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
const services = [{id: 1, name: 'Big Clock', time: '3'}, {id: 2, name: 'Middle Clock', time: '2'}, {
	id: 3,
	name: 'Small Clock',
	time: '1'
}]

const SearchForm = (props) => {
	const classes = useStyles();
	const {handleChange, find, state, clear} = props;


	return (
		<Box component={Paper} className={classes.root}>
			<form onSubmit={(e) => find(e)}>
				<Box className={classes.inputWrap}>
					{/*<AutocompleteField data={services} label='service' edit={handleChange} helper='Choose a service'/>*/}
					{/*<AutocompleteField data={services} label='service' edit={handleChange} helper='Choose a service'/>*/}
					{/*<AutocompleteField data={services} label='service' edit={handleChange} helper='Choose a service'/>*/}
					{/*<AutocompleteField data={services} label='service' edit={handleChange} helper='Choose a service'/>*/}
					{/*<TextField label='Service' name='service' value={state.service} helperText='Choose a service' required className={classes.input} onChange={(e) => handleChange(e)}/>*/}
					{/*<TextField label='City' name='city' value={state.city} helperText='Choose a city' required className={classes.input} onChange={(e) => handleChange(e)}/>*/}
					{/*<TextField label='Date' name='date' value={state.date} helperText='Pick a date' required className={classes.input} onChange={(e) => handleChange(e)}/>*/}
					{/*<TextField label='Time' name='time' value={state.time} helperText='Pick a time' required className={classes.input} onChange={(e) => handleChange(e)}/>*/}
				</Box>
				<Box className={classes.btnWrap}>
					<Button type='submit' variant="contained" color="primary" className={classes.btn}>Find Master!</Button>
					<Button type='reset' variant="contained" className={classes.btn} onClick={clear}>Clear</Button>
				</Box>
			</form>
		</Box>
	)
}
export default SearchForm;