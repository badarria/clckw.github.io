import React, {useEffect, useState, Fragment} from 'react';
import {
	makeStyles,
	Table,
	TableBody,
	Paper,
	TableContainer,
	TableFooter,
	TableRow,
	TablePagination,
	TableCell, TableHead
} from '@material-ui/core';
import AdminTableList from './Table-List/admin-table-list'
import AdminTableHeader from "./Table-Header/admin-table-header";
import AdminTableHeaderEditing from './Table-Header/admin-table-header-editing';


const useStyles = makeStyles({
	table: {
		minWidth: 600,
	},
});

const AdminTable = (props) => {
	const {subj} = props;
	const path = `/admin/${subj}`;

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
			await fetch(`${path}/${id}`, {
				method: "DELETE"
			});
			await getItems();
		} catch (err) {
			console.error(err)
		}
	}

	const updateItem = async () => {
		try {
			const body = dataToChange;
			const id = dataToChange.id;
			const edit = await fetch(`${path}/${id}`, {
				method: "PUT",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(body)
			})
			await getItems();
			cancelInput();
		} catch (err) {
			console.error(err)
		}
	}

	const addItem = async () => {
		try {
			const body = dataToChange;
			const res = await fetch(`${path}`, {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(body)
			})
			await getItems();
			cancelInput();
		} catch (err) {
			console.error(err)
		}
	}

	const getColumnNames = async () => {
		try {
			const res = await fetch(`${path}/columnNames`);
			const req = await res.json();
			const names = await req.map(({column_name}) => column_name.replace(/\Bid|\Bat$/i, ''));
			setColumnNames(names);
		} catch (err) {
			console.error(err.message)
		}
	};


//State
	const [items, setItems] = useState([]);
	const [state, setState] = useState(null);

//data to add new or edit item
	const [dataToChange, setDataToChange] = useState({});

//get column names for a table even if it's empty
	const [columnNames, setColumnNames] = useState([])


	const createNewItem = () => {
		const columns = [...columnNames].filter(key => key !== 'id');
		const data = columns.reduce((acc, key) => {
			return {...acc, [key]: ''}
		}, {})
		setDataToChange(data);
		setState('isAdding')
	}

	const editItem = (key, value) => {
		setDataToChange({...dataToChange, [key]: value})
	}
	const cancelInput = () => {
		setState(null);
		setDataToChange({});
	}
	const pushItemToEdit = (data) => {
		setDataToChange({...data});
		setState('isEditing');
	}


	useEffect(() => {
		getItems();
		getColumnNames();
	}, []);


//Material UI const
	const classes = useStyles();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);
	const itemsPerPage = items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
	const changePage = (event, newPage) => setPage(newPage);
	const changeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<Fragment>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label={`${subj} table`}>
					<TableHead>
						{state ?
							<AdminTableHeaderEditing cancelInput={cancelInput} dataToChange={dataToChange} state={state}
																			 updateItem={updateItem}
																			 editItem={editItem} addItem={addItem}/> :
							<AdminTableHeader columnNames={columnNames} createNewItem={createNewItem}/>}
					</TableHead>
					<TableBody>
						<AdminTableList data={itemsPerPage} deleteItem={deleteItem} pushItemToEdit={pushItemToEdit}
														state={state}/>
						{emptyRows > 0 && (
							<TableRow style={{height: 53 * emptyRows}}>
								<TableCell component='td'/>
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
								count={items.length}
								rowsPerPage={rowsPerPage}
								page={page}
								SelectProps={{
									inputProps: {'aria-label': 'rows per page'},
									native: true,
								}}
								onChangePage={changePage}
								onChangeRowsPerPage={changeRowsPerPage}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</Fragment>
	);
}

export default AdminTable;