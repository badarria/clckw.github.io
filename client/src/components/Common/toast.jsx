import React from "react";
import {Alert} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";

export const useStyle = makeStyles({
	msgBox: {padding: '16px'},
})


export const Toast = (props) => {
	const {type = 'success', msg} = props
const classes = useStyle()
	return (
		<Slide direction="left" in={!!msg}>
			<Alert severity={type} className={classes.msgBox}>
				{msg}
			</Alert>
		</Slide>
	)
}