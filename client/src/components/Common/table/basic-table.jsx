import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Box,
} from "@material-ui/core";
import BasicTableList from "./basic-table-list";
import { Toast } from "../toast";
import { useTableStyles } from "../../styles/styles";
import { Pagination } from "./pagination";

export const BasicTable = (props) => {
  const {
    items,
    columns,
    remove,
    push,
    editState,
    toast,
    header,
    pagination,
  } = props;
  const classes = useTableStyles();

  return (
    <Box className={classes.wrap}>
      <Box className={classes.box}>
        <Toast toast={toast} />
      </Box>
      <TableContainer component={Paper} className={classes.root}>
        <Table className={classes.table} aria-label={`table`}>
          <TableHead className={classes.head}>{header}</TableHead>
          <TableBody>
            <BasicTableList
              data={items}
              remove={remove}
              push={push}
              editState={editState}
              columns={columns}
            />
            {/*{emptyRows > 0 && (*/}
            {/*	<TableRow style={{height: 53 * emptyRows}}>*/}
            {/*		<TableCell component='td'/>*/}
            {/*	</TableRow>*/}
            {/*)}*/}
          </TableBody>
          <TableFooter>
            <TableRow>
              {pagination}
              {/*<Pagination {...paginationProps}/>*/}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};
