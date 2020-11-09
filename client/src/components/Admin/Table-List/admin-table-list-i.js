import React, {Fragment} from 'react';
import {TableCell} from "@material-ui/core";
import PropTypes from "prop-types";

const AdminTableListItem = (props) => {
	const {data} = props;

	return (
		<Fragment>
			{data.map(([key, value], i) => {
				return (
					<TableCell key={i}>{value}</TableCell>
				)
			})}

		</Fragment>)
}

export default AdminTableListItem;