import { TableRow, TableCell, TableSortLabel, Typography } from '@material-ui/core'
import React from 'react'
import { useStyles } from './styles'
import { Paging } from 'types'

type Props = {
  order: 'desc' | 'asc'
  orderby: string
  setChange: (data: Paging) => void
  types: string[]
}

const columns = ['master', 'types', 'completed', 'rating', 'amount']

export const Chart4Head = (props: Props) => {
  const { order, orderby, setChange, types } = props
  const { visuallyHidden, type } = useStyles()

  const createSortHandler = (prop: string) => () => {
    const isAsc = orderby === prop && order === 'asc'
    const data: Paging = { order: isAsc ? 'desc' : 'asc', orderby: prop }
    setChange(data)
  }

  return (
    <TableRow component='tr'>
      <TableCell>
        <TableSortLabel active={orderby === 'master'} direction={order} onClick={createSortHandler('master')}>
          master
          {orderby === 'master' ? (
            <span className={visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
          ) : null}
        </TableSortLabel>
      </TableCell>
      <TableCell>
        Types
        <Typography>
          {types.map((type) => (
            <span className={type}>{type}</span>
          ))}
        </Typography>
      </TableCell>
      <TableCell>
        <TableSortLabel active={orderby === 'master'} direction={order} onClick={createSortHandler('master')}>
          master
          {orderby === 'master' ? (
            <span className={visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
          ) : null}
        </TableSortLabel>
      </TableCell>
    </TableRow>
  )
}
