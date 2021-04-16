import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { Response } from '../../../../types'
import { ButtonDialog, PdfBtn, ZipBtn } from '.'
import { OrdersList, ChangeStatus } from '../types'

type Props = {
  data: OrdersList[]
  columns: string[]
  change: (data: ChangeStatus) => void
  getZip: (id: number) => Promise<string | Response>
  getPdf: (id: number) => void
}

export const MasterTableList = (props: Props) => {
  const { data, columns, change, getZip, getPdf } = props
  const generatedColumns = columns.slice(0, -3)

  if (data.length)
    return (
      <>
        {data.map((item: OrdersList, inx: number) => {
          const { id, completed, userEmail, customer, photos } = item
          const dataForLetter = { id, userEmail, name: customer }
          const zipBtnProps = { id, getZip, disabled: !photos }
          const pdfBtnProps = { id, getPdf, disabled: !completed }
          const thisItem: any = { ...item }

          return (
            <TableRow key={inx} component='tr'>
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

              <ZipBtn {...zipBtnProps} />
              <PdfBtn {...pdfBtnProps} />
            </TableRow>
          )
        })}
      </>
    )
  else
    return (
      <TableRow component='tr'>
        <TableCell align='center' colSpan={11} component='td'>
          There is no placed order
        </TableCell>
      </TableRow>
    )
}
