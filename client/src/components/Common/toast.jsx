import React from "react";
import {Alert} from "@material-ui/lab";
import Collapse from "@material-ui/core/Collapse";
import {makeStyles} from "@material-ui/core/styles";

export const useStyle = makeStyles({
	msgBox: {width: '70%', margin: '0 auto', padding: '24px'},
})


export const Toast = (props) => {
	const {type = 'success', msg} = props
const classes = useStyle()
	return (
		<Collapse in={!!msg}>
			<Alert severity={type} className={classes.msgBox}>
				{msg}
			</Alert>
		</Collapse>
	)
}