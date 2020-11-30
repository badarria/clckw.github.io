import {TableRow, TableCell} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TableButton from "../table-button";


const AdminTableHeaderRedux = (props) => {
	const {columns, create} = props.headProps;

	return (
		<TableRow component='tr'>
			<TableCell>{columns.length ? '#' : null}</TableCell>
			{columns.map((column, i) => {
				return (
					<TableCell key={i}>
						{column}
					</TableCell>
				)
			})}
			<TableButton handleClick={() => create(columns, 'isCreating')} colSpan={2} title='Add New'
									 icon={<AddCircleOutlineIcon/>}/>
		</TableRow>
	)
}

AdminTableHeaderRedux.propTypes = {
	headProps: PropTypes.shape({
		columns: PropTypes.array.isRequired,
		create: PropTypes.func.isRequired,
	})
};

export default AdminTableHeaderRedux