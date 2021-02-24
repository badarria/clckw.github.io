import { TableRow, TableCell, IconButton, TableSortLabel } from '@material-ui/core'
import React from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { useStyles } from './styles'
import { AdminTableHeadProps } from 'types'

export const AdminTableHead = (props: AdminTableHeadProps) => {
  const { columns, push, order, orderby, setChange } = props
  const { visuallyHidden } = useStyles()

  const createSortHandler = (prop: string) => () => {
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
                <span className={visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        )
      })}
      <TableCell colSpan={2} align='right'>
        <IconButton onClick={() => push(columns)} title='Add New Item'>
          <AddCircleOutlineIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
