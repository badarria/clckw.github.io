import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Dialog} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Login = (props) => {
	const {loginUser, classes} = props;
	const [open, setOpen] = useState(false);
	const [userData, setUserData] = useState({});

	const acceptLogin = () => {
		loginUser(userData);
		handleClose();
	}

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setUserData({});
	};


	return (
		<div>
			<Button color="inherit" className={classes} onClick={handleClickOpen}>
				Login
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Login</DialogTitle>
				<DialogContent>
					<form>
						<TextField
							autoFocus
							id="name"
							label="Name"
							type="text"
							fullWidth
							required={true}
							value={userData.name}
							onChange={(e) => setUserData({...userData, 'name': e.target.value})}
							className={{marginBottom: '50px'}}/>
						<TextField
							autoFocus
							id="password"
							label="Password"
							type="text"
							fullWidth
							required={true}
							value={userData.password}
							onChange={(e) => setUserData({...userData, 'password': e.target.value})}
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={acceptLogin} color="primary">
						Accept
					</Button>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}


export default Login;