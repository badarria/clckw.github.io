import React from "react";
import {Clear, Done} from "@material-ui/icons";
import AlertDialog from "../alert-dialog";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";


export const BasicTableForm = (props) => {

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
				<form onSubmit={submit}
							style={{display: 'flex', justifyContent: "space-between", width: '100%', alignItems: 'center'}}>
					{children}
					<AlertDialog {...acceptDialogProps}/>
					<AlertDialog {...resetDialogProps}/>
				</form>
			</TableCell>
		</TableRow>
	)
}