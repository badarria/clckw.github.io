import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { MasterTableListProps, MasterOrdersList } from '../../../../types'
import { ButtonDialog } from '.'

export const MasterTableList = ({ data, columns, change }: MasterTableListProps) => {
  return (
    <>
      {data.map((item: MasterOrdersList, inx: number) => {
        const { id, completed, userEmail, customer } = item
        const dataForLetter = { id, userEmail, name: customer }

        return (
          <TableRow key={id} component='tr'>
            <TableCell component='td'>{inx + 1}</TableCell>
            {columns.map((col) => {
              const thisItem: any = { ...item }
              return col !== 'completed' ? (
                <TableCell component='td'>{thisItem[col]}</TableCell>
              ) : (
                <TableCell>
                  <ButtonDialog accept={() => change(dataForLetter)} isDisabled={completed} />
                </TableCell>
              )
            })}
          </TableRow>
        )
      })}
    </>
  )
}
