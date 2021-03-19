import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { MasterTableListProps, MastersOrder } from '../../../../types'

export const MasterTableList = (props: MasterTableListProps) => {
  const { data, columns } = props
  console.log(data)
  return (
    <>
      {data.map((item: MastersOrder, inx: number) => {
        const { id, c, s, date, begin, finish, rating } = item

        return (
          <TableRow key={id} component='tr'>
            <TableCell component='td'>{inx + 1}</TableCell>
            <TableCell component='td'>{id}</TableCell>
            <TableCell component='td'>{c.fullName}</TableCell>
            <TableCell component='td'>{s.service}</TableCell>
            <TableCell component='td'>{date}</TableCell>
            <TableCell component='td'>{begin}</TableCell>
            <TableCell component='td'>{finish}</TableCell>
            <TableCell component='td'>{rating}</TableCell>
          </TableRow>
        )
      })}
    </>
  )
}
