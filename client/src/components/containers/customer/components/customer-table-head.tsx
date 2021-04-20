import { TableRow, TableCell, TableSortLabel, TableHead } from '@material-ui/core'
import { Columns } from '../types'
import React from 'react'
import { Paging } from '../.../../../../../types'
import { useStyles } from '../styles'

type Props = {
  columns: Columns
  order: 'desc' | 'asc'
  orderby: string
  setChange: (data: Paging) => void
}

export const CustomerTableHead = (props: Props) => {
  const { columns, order, orderby, setChange } = props
  const { visuallyHidden, head } = useStyles()

  const createSortHandler = (prop: string) => () => {
    const isAsc = orderby === prop && order === 'asc'
    const data: Paging = { order: isAsc ? 'desc' : 'asc', orderby: prop }
    setChange(data)
  }

  return (
    <TableHead className={head}>
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
      </TableRow>
    </TableHead>
  )
}
