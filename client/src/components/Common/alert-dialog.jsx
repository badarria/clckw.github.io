import React, {Fragment} from 'react';
import {Dialog, DialogActions, DialogContent, Button, DialogContentText, DialogTitle} from '@material-ui/core';
import {ButtonIcon} from "./button-icon";


const AlertDialog = (props) => {
	const [open, setOpen] = React.useState(false);
	const {icon = null, title, accept, question, description, disabled, type} = props;
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleAccept = () => {
		accept();
		setOpen(false);
	}

	return (
		<Fragment>
			<ButtonIcon onClick={handleClickOpen} title={title} disabled={disabled} icon={icon} type={type}/>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle id="alert-dialog-title">{question}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{description}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAccept} color="primary" autoFocus>
						Ok
					</Button>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}

AlertDialog.defaultProps = {
	question: 'Are you sure?',
	description: 'This item will be permanently removed from the database',
}

export default AlertDialog