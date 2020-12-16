import React from "react";
import {Clear, Done} from "@material-ui/icons";
import AlertDialog from "../alert-dialog";
import {TableRow, Box, TableCell} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
	form: {display: 'flex', justifyContent: "space-between", width: '100%', alignItems: 'center'},
	fields: {display: 'flex', maxWidth: '90%',},
	buttons: {flexGrow: 1, display: 'flex', justifyContent: 'flex-end'}
})


export const BasicTableForm = (props) => {
	const classes = useStyles()
	const {children, submit, reset} = props;

	const acceptDialogProps = {
		icon: <Done fontSize="small"/>,
		title: "Submit form",
		question: "Submit form?",
		description: "Save and make changes to the database",
		accept: submit,
	}

	const resetDialogProps = {
		icon: <Clear fontSize="small"/>,
		title: "Reset all changes",
		question: "Reset form?",
		description: "Changes will not be saved",
		type: "reset",
		accept: reset
	}


	return (
		<TableRow>
			<TableCell colSpan={11}>
				<form onSubmit={submit} className={classes.form}>
					<Box className={classes.fields}>
						{children}
					</Box>
					<Box className={classes.buttons}>
						<AlertDialog {...acceptDialogProps}/>
						<AlertDialog {...resetDialogProps}/>
					</Box>
				</form>
			</TableCell>
		</TableRow>
	)
}