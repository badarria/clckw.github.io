import React from 'react'
import { Paper, Table, TableBody, TableContainer, TableFooter, TableHead, TableRow, Box } from '@material-ui/core'
import { AdminTableList } from '../_elements'
import { useStyles } from './styles'
import { Toast } from '../index'

export const AdminTable = (props) => {
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
