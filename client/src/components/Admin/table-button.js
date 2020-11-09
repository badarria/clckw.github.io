import {IconButton, TableCell, Tooltip} from "@material-ui/core";
import React, {Fragment} from "react";

const TableButton = (props) => {
	const {handleClick, icon, title, disabled, colSpan} = props;

	return (
			<TableCell component='th' align='right' colSpan={colSpan}>
				<Tooltip title={title} onClick={handleClick}>
					<IconButton aria-label={title} disabled={disabled}>
						{icon}
					</IconButton>
				</Tooltip>
			</TableCell>
	)
}
TableButton.defaultProps = {
	disabled: false,
	colSpan: 1
}

export default TableButton;
