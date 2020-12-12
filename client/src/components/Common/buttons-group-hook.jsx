import TableButton from "./table-button";
import {Clear, Done} from "@material-ui/icons";
import {IconButton, TableRow, Tooltip} from "@material-ui/core";
import React from "react";


const ButtonsGroupHook = (props) => {
const {reset} = props

	return (
		<>
			<div>
				<Tooltip title="Accept">
					<IconButton aria-label='Accept' type="submit">
						<Done fontSize="small"/>
					</IconButton>
				</Tooltip>
			</div>
			<div>
				<Tooltip title="Reset">
					<IconButton aria-label='Reset' type="reset" onClick={() => reset()}>
						<Clear fontSize="small"/>
					</IconButton>
				</Tooltip>
			</div>
		</>
	)
}

export default ButtonsGroupHook