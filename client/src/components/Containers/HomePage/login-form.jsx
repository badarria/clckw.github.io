import React, {useState} from 'react';
import {Dialog, DialogContent, DialogTitle, Button, Box, TextField} from '@material-ui/core';
import {useForm} from "react-hook-form";

export const LoginForm = (props) => {
	const {login, classes} = props;
	const [open, setOpen] = useState(false);
	const {register, handleSubmit, reset} = useForm()

	const submit = (data) => {
		login(data);
		handleClose();
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		reset();
	};

	return (
		<div>
			<Button color="inherit" className={classes} onClick={handleClickOpen}>
				Login
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{margin: '0', padding: '0, 32px, 32px'}}>
				<DialogTitle id="form-dialog" style={{margin: '0'}}>Login</DialogTitle>
				<DialogContent style={{padding: '0px 24px 16px'}}>
					<form onSubmit={handleSubmit(submit)}
								style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0, 32px, 32px'}}>
						<TextField
							autoFocus
							id="name"
							label="Name"
							name='name'
							type="text"
							size='medium'
							inputRef={register}
							required
							style={{marginBottom: '16px'}}
						/>
						<TextField
							autoFocus
							id="password"
							label="Password"
							name='password'
							type="password"
							inputRef={register}
							required
							style={{marginBottom: '24px'}}
						/>
						<Box>
							<Button type='submit' color="primary">
								Accept
							</Button>
							<Button onClick={handleClose} type='reset' color="primary">
								Cancel
							</Button>
						</Box>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
