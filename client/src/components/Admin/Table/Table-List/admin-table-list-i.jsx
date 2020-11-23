import React, {Fragment} from 'react';
import {TableCell} from "@material-ui/core";
import PropTypes from "prop-types";

const AdminTableListItem = (props) => {
	const {data, columns } = props;

	return (
		<Fragment>
			{columns.map((key, i) => {
				return (
					<TableCell key={i}>{data[key]}</TableCell>
				)
			})}
		</Fragment>)
}

export default AdminTableListItem;