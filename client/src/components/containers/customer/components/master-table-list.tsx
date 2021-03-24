import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { CustomerTableListProps, CustomerOrdersList } from '../../../../types'
import { ButtonDialog } from '.'

export const CustomerTableList = ({ data, columns, change }: CustomerTableListProps) => {
  return (
    <>
      {data.map((item: CustomerOrdersList, inx: number) => {
        const { id, rating, completed, master } = item

        return (
          <TableRow key={inx} component='tr'>
            <TableCell component='td'>{inx + 1}</TableCell>
            {columns.map((col) => {
              const thisItem: any = { ...item }
              return <TableCell component='td'>{thisItem[col]}</TableCell>
              // <TableCell>
              //   <ButtonDialog accept={() => change({id, rating})} isDisabled={completed} />
              // </TableCell>
            })}
          </TableRow>
        )
      })}
    </>
  )
}
