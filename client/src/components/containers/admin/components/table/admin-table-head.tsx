import { TableRow, TableCell, IconButton, TableSortLabel } from '@material-ui/core'
import React, { useCallback } from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { useStyles } from './styles'
import { Paging } from '../.../../../../../../types'

type Props = {
  columns: string[]
  push: (data: string[]) => void
  order: 'desc' | 'asc'
  orderby: string
  setChange: (data: Paging) => void
}

export const AdminTableHead = (props: Props) => {
  const { columns, push, order, orderby, setChange } = props
  const { visuallyHidden } = useStyles()

  const createSortHandler = (prop: string) => () => {
    const isAsc = orderby === prop && order === 'asc'
    const data: Paging = { order: isAsc ? 'desc' : 'asc', orderby: prop }
    setChange(data)
  }

  const click = useCallback(() => push(columns), [])

  return (
    <TableRow component='tr'>
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
        <IconButton onClick={click} title='Add New Item'>
          <AddCircleOutlineIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
