import React, {useState, Fragment} from 'react';
import {
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter, TableHead,
	TablePagination,
	TableRow
} from "@material-ui/core";

import BasicTableList from "./basic-table-list";

const useStyles = makeStyles({
	root: {
		width: 'fit-content',
		margin: "56px auto 80px",
	},
	table: {
		minWidth: 600,
		width: 'auto'
	},
	head: {
		textTransform: 'capitalize',
		background: '#bfbfbf33'
	},
});

export const BasicTable = (props) => {
	const {children, items, columns, remove, push, editState, itemsOnPage = 5,} = props


	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(itemsOnPage);

	const classes = useStyles();
	const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);
	const itemsPerPage = items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
	const changePage = (event, newPage) => setPage(newPage);
	const changeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<Fragment>
			<TableContainer component={Paper} className={classes.root}>
				<Table className={classes.table} aria-label={`table`}>
					<TableHead className={classes.head}>
						{children}
					</TableHead>
					<TableBody>
						<BasicTableList data={itemsPerPage} remove={remove} push={push}
														editState={editState} columns={columns}/>
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
	)
}
