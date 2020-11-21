import {TableRow, TableCell,makeStyles} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TableButton from "../table-button";




const AdminTableHeader = (props) => {
	const {columns, create} = props;

	return (
		<TableRow component='tr'>
			<TableCell>{columns.length? '#' : null}</TableCell>
			{columns.map((column, i) => {
				return (
					<TableCell key={i}>
						{column}
					</TableCell>
				)
			})}
			<TableButton handleClick={create} colSpan={2} title='Add New' icon={<AddCircleOutlineIcon/>}/>
		</TableRow>
	)
}
AdminTableHeader.propTypes = {
	columns: PropTypes.array.isRequired,
	create: PropTypes.func.isRequired
};

export default AdminTableHeader