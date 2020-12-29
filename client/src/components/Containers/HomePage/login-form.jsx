import React, {useState} from 'react';
import {useLocation, useHistory,} from 'react-router-dom'
import {Dialog, DialogContent, DialogTitle, Button, Box, TextField} from '@material-ui/core';
import {useForm} from "react-hook-form";
import {Typography} from "@material-ui/core";
import {schema} from '../../../validation/home-schema'
import {yupResolver} from "@hookform/resolvers/yup";
import {useLoginFormStyles} from "../../styles/styles";



export const LoginForm = ({login}) => {
	const classes = useLoginFormStyles()
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
			setMsg(res.msg)
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
							<Button type='submit' color="primary" variant="contained" className={classes.button}>
								Ok
							</Button>
							<Button onClick={handleClose} type='reset' variant="contained" >
								Cancel
							</Button>
						</Box>
					</form>
				</DialogContent>
			</Dialog>
		</>
	)
}
