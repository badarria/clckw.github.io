import {TableRow, TableCell} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TableButton from "../table-button";


const AdminTableHeader = (props) => {
	const {columnNames, createNewItem} = props;
	console.log(columnNames);

	return (
		<TableRow component='tr'>
			<TableCell>#</TableCell>
			{columnNames.map((columnName, i) => {
				return (
					<TableCell key={i}>
						{columnName}
					</TableCell>
				)
			})}
			<TableButton handleClick={createNewItem} colSpan={2} title='Add New' icon={<AddCircleOutlineIcon/>}/>
		</TableRow>
	)
}
AdminTableHeader.propTypes = {
	columnNames: PropTypes.array.isRequired,
	createNewItem: PropTypes.func.isRequired
};

export default AdminTableHeader