import { TableRow, TableCell, IconButton } from '@material-ui/core'
import React from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { useTableHeadStyles } from '../../styles/styles'

export const BasicTableHead = (props) => {
  const { columns, push, order, orderby, setChange } = props
  const classes = useTableHeadStyles()

  const createSortHandler = (prop) => (event) => {
    const isAsc = orderby === prop && order === 'asc'
    const data = { order: isAsc ? 'desc' : 'asc', orderby: prop }
    setChange(data)
  }

  return (
    <TableRow component='tr'>
      <TableCell>{columns.length ? '#' : null}</TableCell>
      {columns.map((column, i) => {
        return (
          <TableCell key={i}>
            <TableSortLabel active={orderby === column} direction={order} onClick={createSortHandler(column)}>
              {column}
              {orderby === column ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        )
      })}
      <TableCell colSpan={2} align='right'>
        <IconButton onClick={() => push(columns, 'isCreating')} colSpan={2} title='Add New Item'>
          <AddCircleOutlineIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
