import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from "prop-types";


const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const TableSelect = (props) => {
	const {data, label, setFunc, state} = props
	const classes = useStyles();


	return (
		<Fragment>
			<FormControl className={classes.formControl}>
				<InputLabel id={data.id}>{label}</InputLabel>
				<Select value={state} onChange={setFunc}>
					{data.map(({id, name}) => {
						return (
							<MenuItem value={id} key={id}>{name}</MenuItem>
						)
					})}
				</Select>
			</FormControl>
		</Fragment>
	);
}
Select.propTypes = {
	data: PropTypes.shape({'id': PropTypes.number, 'name': PropTypes.string}),
	label: PropTypes.string,
};

export default TableSelect;