import { TableRow, TableCell, TableSortLabel, TableHead } from '@material-ui/core'
import React from 'react'
import { useStyles } from '../styles'
import { Paging } from '../../../../types'
import { Columns } from '../types'

type Props = {
  columns: Columns
  order: 'desc' | 'asc'
  orderby: string
  setChange: (data: Paging) => void
}

export const MasterTableHead = (props: Props) => {
  const { columns, order, orderby, setChange } = props
  const { visuallyHidden, head } = useStyles()

  const createSortHandler = (prop: string) => () => {
    const isAsc = orderby === prop && order === 'asc'
    const data: Paging = { order: isAsc ? 'desc' : 'asc', orderby: prop }
    setChange(data)
  }
  const columnsWithSort = columns.slice(0, -1)

  return (
    <TableHead className={head}>
      <TableRow component='tr'>
        {columnsWithSort.map((column, i) => {
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
        <TableCell key={'receipt'}>receipt</TableCell>
      </TableRow>
    </TableHead>
  )
}
