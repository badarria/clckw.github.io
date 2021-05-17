import { TableRow, TableCell, TableSortLabel } from '@material-ui/core'
import React from 'react'
import { useStyles } from '../styles'
import { Paging } from 'types'

type Props = {
  order: 'desc' | 'asc'
  orderby: string
  setChange: (data: Paging) => void
  servicesKeys: string[]
}

export const Chart4Head = (props: Props) => {
  const { order, orderby, setChange, servicesKeys } = props
  const { visuallyHidden } = useStyles()

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
        <TableSortLabel active={orderby === 'orders'} direction={order} onClick={createSortHandler('orders')}>
          orders
          {orderby === 'orders' ? (
            <span className={visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
          ) : null}
        </TableSortLabel>
      </TableCell>
      {servicesKeys.map((type) => (
        <TableCell size='small'>{type}</TableCell>
      ))}
      <TableCell>
        <TableSortLabel active={orderby === 'iscompleted'} direction={order} onClick={createSortHandler('iscompleted')}>
          completed
          {orderby === 'iscompleted' ? (
            <span className={visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
          ) : null}
        </TableSortLabel>
      </TableCell>
      <TableCell>
        <TableSortLabel
          active={orderby === 'isnotcompleted'}
          direction={order}
          onClick={createSortHandler('isnotcompleted')}>
          not completed
          {orderby === 'isnotcompleted' ? (
            <span className={visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
          ) : null}
        </TableSortLabel>
      </TableCell>
      <TableCell>
        <TableSortLabel active={orderby === 'rating'} direction={order} onClick={createSortHandler('rating')}>
          rating
          {orderby === 'rating' ? (
            <span className={visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
          ) : null}
        </TableSortLabel>
      </TableCell>
      <TableCell>
        <TableSortLabel active={orderby === 'price'} direction={order} onClick={createSortHandler('price')}>
          amount
          {orderby === 'price' ? (
            <span className={visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
          ) : null}
        </TableSortLabel>
      </TableCell>
    </TableRow>
  )
}
