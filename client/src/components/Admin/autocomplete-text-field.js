import React, {Fragment, useState} from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import {makeStyles, FormControl, InputLabel, TextField, List, ListItem, ListItemText} from '@material-ui/core';
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
	listbox: {
		width: 200,
		margin: 0,
		padding: 0,
		zIndex: 1,
		position: 'absolute',
		listStyle: 'none',
		backgroundColor: theme.palette.background.paper,
		overflow: 'auto',
		maxHeight: 200,
		border: '1px solid rgba(0,0,0,.25)',
		'& li[data-focus="true"]': {
			backgroundColor: '#4a8df6',
			color: 'white',
			cursor: 'pointer',
		},
		'& li:active': {
			backgroundColor: '#2977f5',
			color: 'white',
		},
	},
}));

const AutocompleteTextField = (props) => {
	const classes = useStyles();
	const {data} = props;
	const [inputValue, setInputValue] = useState({});
	console.log(inputValue)

	const {
		getRootProps,
		getInputLabelProps,
		getInputProps,
		getListboxProps,
		getOptionProps,
		groupedOptions,
	} = useAutocomplete({

		id: 'someid',
		options: data,
		getOptionLabel: (option) => option.name,
		getOptionSelected: (option) => option.id
	});

	return (
		<Fragment>
			<FormControl {...getRootProps()}>
				<InputLabel {...getInputLabelProps()} />
				<TextField {...getInputProps()} />
			</FormControl>
			{groupedOptions.length > 0 ? (
				<List className={classes.listbox} {...getListboxProps()}>
					{groupedOptions.map((option, index) => (
						<ListItem button >
							<ListItemText {...getOptionProps({option, index})} id={option.id} >{option.name}</ListItemText>
						</ListItem>
					))}
				</List>
			) : null}
		</Fragment>
	);
}

AutocompleteTextField.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		'id': PropTypes.number,
		'name': PropTypes.string,
	}))
}


export default AutocompleteTextField;