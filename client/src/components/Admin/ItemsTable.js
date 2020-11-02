import React, {useEffect, useState} from 'react';
import {
	makeStyles,
	useTheme,
	Table,
	TableBody,
	Paper,
	TableContainer,
	TableFooter,
	TableRow,
	TablePagination,
	TableCell
} from '@material-ui/core';
import Pagination from './Pagination'
import TableList from './TableList'
import InputItem from './InputItem'
import TableHeader from "./TableHeader";

const useStyles = makeStyles({
	table: {
		minWidth: 500,
	},
});

const ItemsTable = (props) => {
	const {subj} = props;
	const path = `http://localhost:5000/admin/${subj}`;

	const getItems = async () => {
		try {
			const response = await fetch(path);
			const jsonData = await response.json();
			setItems(jsonData);
		} catch (err) {
			console.error(err.message);
		}
	}

	const deleteItem = async (id) => {
		try {
			const deleteItem = await fetch(`${path}/${id}`, {
				method: "DELETE"
			});
			getItems();
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		getItems();
	}, []);

	const [items, setItems] = useState([]);
	const [dataToEdit, setDataToEdit] = useState([]);
	const [dataEdited, editItem] = useState({});

	const classes = useStyles();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const labels = items[0];


	const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);
	const itemsPerPage = items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	const changePage = (event, newPage) => {
		setPage(newPage);
	};

	const changeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<TableContainer component={Paper}>
			<InputItem data={dataToEdit} editItem={editItem}/>
			<Table className={classes.table} aria-label={`${subj} table`}>
				<TableHeader data={labels}/>
				<TableBody>
					<TableList data={itemsPerPage} deleteItem={deleteItem} setDataToEdit={setDataToEdit}/>
					{emptyRows > 0 && (
						<TableRow style={{height: 53 * emptyRows}}>
							<TableCell colSpan={6}/>
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
							colSpan={3}
							count={items.length}
							rowsPerPage={rowsPerPage}
							page={page}
							SelectProps={{
								inputProps: {'aria-label': 'rows per page'},
								native: true,
							}}
							onChangePage={changePage}
							onChangeRowsPerPage={changeRowsPerPage}
							ActionsComponent={Pagination}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
}

export default ItemsTable;