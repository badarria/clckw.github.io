import React, {useEffect, useState, useRef, Fragment} from "react";
import {makeStyles, FormControl, TextField, List, ListItem, ListItemText, Box} from '@material-ui/core';
import {Controller} from "react-hook-form";


const useStyles = makeStyles((theme) => ({
	root: {
		// position: 'relative',
	},
	listbox: {
		width: 200,
		margin: 0,
		padding: 0,
		zIndex: 1,
		position: 'absolute',
		// bottom: '0',
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


const AutocompleteFieldHook = (props) => {
	const {data, label, onChange, helper} = props;
	const editedItem = data[0]

	const [display, setDisplay] = useState(false);
	const [search, setSearch] = useState(editedItem);
	const wrapperRef = useRef(null);
	const classes = useStyles();

	const options = data.map(({id, name, ...rest}) => {
		return {'id': id, 'name': name.toLowerCase(), ...rest}
	}).filter(({name}) => name && name.includes(search.name.toLowerCase()));

	const setItem = (option) => {
		setSearch({'id': option.id, 'name': option.name});
		setDisplay(false);
		onChange(option)
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
			onChange(null)
		}
		;
	}


	return (
		<Box>
				<TextField label={label} onClick={() => setDisplay(!display)} value={search.name}  style={{margin: '16px'}}
									 onChange={(e) => handleChange(e)} onBlur={handleBlur} autoComplete='nope' helperText={helper} size="small" className={classes.root}/>
			{display && (
				<List className={classes.listbox} ref={wrapperRef}>
					{options.map((option, i) => {
						return (
							<ListItem button key={i} onClick={() => setItem(option)} tabIndex="0">
								<ListItemText id={i}>{option.name}</ListItemText>
							</ListItem>)
					})}
				</List>)}
		</Box>
	)
}

export default AutocompleteFieldHook;