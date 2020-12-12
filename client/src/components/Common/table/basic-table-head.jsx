import {TableRow, TableCell, IconButton} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';



const BasicTableHead = (props) => {
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
			<TableCell colSpan={2} align="right">
				<IconButton onClick={() => create(columns, 'isCreating')} colSpan={2} title='Add New Item'>
					<AddCircleOutlineIcon/>
				</IconButton>
			</TableCell>
		</TableRow>
	)
}

BasicTableHead.propTypes = {
	headProps: PropTypes.shape({
		columns: PropTypes.array.isRequired,
		create: PropTypes.func.isRequired,
	})
};

export default BasicTableHead