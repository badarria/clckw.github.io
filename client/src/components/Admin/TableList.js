import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableItem from "./TableItem";
import PropTypes from "prop-types";


const TableList = (props) => {
	const {data, deleteItem, setDataToEdit} = props;

	return (
		data.map((item) => {
			const data = Object.entries(item);
			const id = item.id;
			return (
				<TableRow key={id}>
					<TableItem data={data}  deleteItem={deleteItem} setDataToEdit={setDataToEdit}/>
				</TableRow>
			)
		})
	)

}
TableList.propTypes = {
	data: PropTypes.array.isRequired,
	deleteItem: PropTypes.func.isRequired,
};

export default TableList
