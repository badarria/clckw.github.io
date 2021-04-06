import React, { useState } from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { MasterTableListProps, MasterOrdersList } from '../../../../types'
import { ButtonDialog, TableButtonIcon } from '.'

export const MasterTableList = ({ data, columns, change, getZip }: MasterTableListProps) => {
  const generatedColumns = columns.slice(0, -2)

  return data[0].id ? (
    <>
      {data.map((item: MasterOrdersList, inx: number) => {
        const { id, completed, userEmail, customer, photos } = item
        const dataForLetter = { id, userEmail, name: customer }
        const iconButtonProps = { id, getZip, disabled: !photos }
        const thisItem: any = { ...item }

        return (
          <TableRow key={inx} component='tr'>
            <TableCell component='td'>{inx + 1}</TableCell>
            {generatedColumns.map((col, inx) => {
              return (
                <TableCell component='td' key={inx}>
                  {thisItem[col]}
                </TableCell>
              )
            })}
            <TableCell>
              <ButtonDialog accept={() => change(dataForLetter)} isDisabled={completed} />
            </TableCell>

            <TableButtonIcon {...iconButtonProps} />
          </TableRow>
        )
      })}
    </>
  ) : (
    <TableRow component='tr'>
      <TableCell align='center' colSpan={10} component='td'>
        There is no placed order
      </TableCell>
    </TableRow>
  )
}
