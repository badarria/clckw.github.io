import React, {useState} from 'react';
import {useLocation, useHistory,} from 'react-router-dom'
import {Dialog, DialogContent, DialogTitle, Button, Box, TextField} from '@material-ui/core';
import {useForm} from "react-hook-form";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {schema} from '../../../validation/home-schema'
import {yupResolver} from "@hookform/resolvers/yup";

export const useStyles = makeStyles({
	button: {marginRight: '16px'},
	title: {padding: '16px 24px 16px'},
	dialog: {'&.MuiDialog-root': {margin: '0', padding: '0 24px 32px', zIndex: '1200'}},
	form: {display: 'flex', flexDirection: 'column', alignItems: 'center'},
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

	const {register, handleSubmit, reset, errors} = useForm({
		resolver: yupResolver(schema.loginForm),
	})

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
				<DialogTitle id="form-dialog" className={classes.title}>Login</DialogTitle>
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
							error={!!errors.name}
							helperText={errors.name?.message || ''}
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
							error={!!errors.password}
							helperText={errors.password?.message || ''}
						/>
						{msg ? <Typography color='secondary' variant='v2'>{msg}</Typography> : null}
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
