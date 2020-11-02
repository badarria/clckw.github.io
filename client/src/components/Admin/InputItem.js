import React, {Fragment, useEffect, useState} from "react";
import {TableCell, TextField, Fab, Tooltip, InputBase, IconButton, makeStyles} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import PropTypes from "prop-types";


const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(2),
		},
	},
}));

const InputItem = (props) => {
	const {data, editItem} = props;
	const classes = useStyles();
	const [edited, setEdited] = useState({})
	console.log(data)


	return (
		<form className={classes.root} noValidate autoComplete="off">
			{data.map(([key, value]) => {
				return (
					<TextField component="th" defaultValue={value} label={key} value={edited[key]}
										 type={key === 'email' ? 'email' : 'text'}
										 onChange={(e) => setEdited({
											 ...edited,
											 [key]: e.target.value
										 })
										 }/>
				)
			})
			}
			<Tooltip title="Edit">
				<IconButton aria-label="Edit">
					<DoneIcon fontSize="small" type="submit" onClick={editItem(edited)}/>
				</IconButton>
			</Tooltip>
			<Tooltip title="Edit">
				<IconButton aria-label="Edit">
					<ClearIcon fontSize="small" />
				</IconButton>
			</Tooltip>
		</form>
	)
}

export default InputItem;