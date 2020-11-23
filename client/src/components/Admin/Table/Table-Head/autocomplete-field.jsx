import React, {useEffect, useState, useRef, Fragment} from "react";
import {makeStyles, FormControl, TextField, List, ListItem, ListItemText} from '@material-ui/core';


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


const AutocompleteField = (props) => {
	const {data, label, edit, helper} = props;
	const editedItem = data[0]

	const [display, setDisplay] = useState(false);
	const [search, setSearch] = useState(editedItem);
	const wrapperRef = useRef(null);
	const classes = useStyles();

	const options = data.map(({id, name}) => {
		return {'id': id, 'name': name.toLowerCase()}
	}).filter(({name}) => name && name.includes(search.name.toLowerCase()));

	const setItem = ({id, name}) => {
		setSearch({'id': id, 'name': name});
		setDisplay(false);
		edit(`${label}_id`, id)
	}

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	const handleClickOutside = e => {
		const {current: wrap} = wrapperRef;
		if (wrap && !wrap.contains(e.target)) {
			setDisplay(false)
		}
	}

	const handleChange = e => {
		e.preventDefault()
		const {value} = e.target;
		setSearch({name: value});
		!options.length && (setDisplay(false));
	}

	const handleBlur = () => {
		if (!options.length) {
			setSearch({"id": null, "name": ""});
			edit(`${label}_id`, null)
		}
		;
	}


	return (
		<Fragment>
			<FormControl>
				<TextField label={label} onClick={() => setDisplay(!display)} value={search.name}
									 onChange={(e) => handleChange(e)} onBlur={handleBlur} autoComplete='nope' helperText={helper} size="small"/>
			</FormControl>
			{display && (
				<List className={classes.listbox} ref={wrapperRef}>
					{options.map((option, i) => {
						return (
							<ListItem button key={i} onClick={() => setItem(option)} tabIndex="0">
								<ListItemText id={i}>{option.name}</ListItemText>
							</ListItem>)
					})}
				</List>)}
		</Fragment>
	)
}

export default AutocompleteField;