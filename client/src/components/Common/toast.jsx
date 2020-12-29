import React from "react";
import {Alert} from "@material-ui/lab";
import {Slide} from "@material-ui/core";
import {useToastStyle} from "../styles/styles";


export const Toast = (props) => {
	const {type, msg} = props.toast
	const classes = useToastStyle()

	return (
		<Slide direction="left" in={!!msg}>
			<Alert severity={type} className={classes.msgBox}>
				{msg}
			</Alert>
		</Slide>
	)
}