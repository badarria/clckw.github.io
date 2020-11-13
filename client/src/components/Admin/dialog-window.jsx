import React, {Fragment} from  'react';
import Button from '@material-ui/core/Button';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import TableButton from './table-button'

const AlertDialog = (props) => {
	const [open, setOpen] = React.useState(false);
	const {icon, title, acceptFunc, messageQuestion, description, disabled} = props;
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleAccept = () => {
		acceptFunc();
		setOpen(false);
	}

	return (
		<Fragment>
			<TableButton icon={icon} handleClick={handleClickOpen} title={title} disabled={disabled}/>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle id="alert-dialog-title">{messageQuestion}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{description}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary" autoFocus>
						Disagree
					</Button>
					<Button onClick={handleAccept} color="primary">
						Agree
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}

AlertDialog.defaultProps = {
	messageQuestion: 'Are you sure?',
	description: 'This will be permanently removed from the database.',
}

export default AlertDialog