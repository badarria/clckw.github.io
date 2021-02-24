import React from 'react'
import { Paper, Table, TableBody, TableContainer, TableFooter, TableHead, TableRow, Box } from '@material-ui/core'
import { useStyles } from './styles'
import { AdminTableList, Toast } from '../index'
import { AdminTableProps } from 'types'

export const AdminTable = (props: AdminTableProps) => {
  const { items, columns, remove, push, editState, toast, header, pagination } = props
  const { wrap, root, box, table, head } = useStyles()

  return (
    <Box className={wrap}>
      <Box className={box}>
        <Toast toast={toast} />
      </Box>
      <TableContainer component={Paper} className={root}>
        <Table className={table} aria-label={`table`}>
          <TableHead className={head}>{header}</TableHead>
          <TableBody>
            <AdminTableList data={items} remove={remove} push={push} editState={editState} columns={columns} />
          </TableBody>
          <TableFooter>
            <TableRow>{pagination}</TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  )
}
