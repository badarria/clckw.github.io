import {TableRow, TableCell, TableHead} from "@material-ui/core";

import React from "react";
import PropTypes from "prop-types";


const TableHeader = (props) => {
	const {data} = props;
	//here some magic
	const labels = data ? Object.keys(data).slice(1) : []
	//
	return (
		<TableHead>
			<TableRow>
				{labels.map(label => {
					return (
						<TableCell>{label}</TableCell>
					)
				})
				}
				<TableCell/>
				<TableCell/>
			</TableRow>
		</TableHead>
	)
}
TableHeader.propTypes = {
	data: PropTypes.object.isRequired,
};

export default TableHeader