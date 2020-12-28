import React, {useState} from 'react';
import {useLocation, useHistory,} from 'react-router-dom'
import {Dialog, DialogContent, DialogTitle, Button, Box, TextField} from '@material-ui/core';
import {useForm} from "react-hook-form";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";


export const useStyles = makeStyles({
	// button: {marginRight: '16px'},
	dialog: {margin: '0', padding: '0 32px 32px'},
	form: {display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 32px 32px'},
	content: {padding: '0px 24px 16px'},
	fields: {marginBottom: '16px'},
	btnWrap: {margin: '16px 0 16px'}
})

export const LoginForm = ({login}) => {
	const classes = useStyles()
	const [open, setOpen] = useState(false);
	const [msg, setMsg] = useState('')
	const {state} = useLocation();
	const history = useHistory();

	const {register, handleSubmit, reset} = useForm()

	const submit = async (data) => {
		const res = await login(data);
		if (res.status) {
			history.push(state?.from || '/admin')
			handleClose();
		} else {
			setMsg(res.msg)
			setTimeout(() => {
				setMsg('')
			}, 2000);
		}
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		reset();
	};

	return (
		<>
			<Button color="inherit" className={classes.button} onClick={handleClickOpen}>
				Login
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.dialog}>
				<DialogTitle id="form-dialog">Login</DialogTitle>
				<DialogContent className={classes.content}>
					<form onSubmit={handleSubmit(submit)} className={classes.form}>
						<TextField
							autoFocus
							id="name"
							label="Name"
							name='name'
							type="text"
							inputRef={register}
							required
							className={classes.fields}
						/>
						<TextField
							autoFocus
							id="password"
							label="Password"
							name='password'
							type="password"
							inputRef={register}
							required
							className={classes.fields}
						/>
						{msg ? <Typography>{msg}</Typography> : null}
						<Box className={classes.btnWrap}>
							<Button type='submit' color="primary" variant="contained">
								Accept
							</Button>
							<Button onClick={handleClose} type='reset' variant="contained">
								Cancel
							</Button>
						</Box>
					</form>
				</DialogContent>
			</Dialog>
		</>
	)
}
