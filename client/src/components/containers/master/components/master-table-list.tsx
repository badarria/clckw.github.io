import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { Response } from '../../../../types'
import { ButtonDialog, PdfBtn, ZipBtn } from '.'
import { List, ChangeStatus, Columns } from '../types'

type Props = {
  data: List[]
  columns: Columns
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
        {data.map((item: List, inx: number) => {
          const { id, completed, email, customer, photos } = item
          const dataForLetter = { id, userEmail: email, name: customer }
          const zipBtnProps = { id, getZip, disabled: !photos }
          const pdfBtnProps = { id, getPdf, disabled: !completed }

          return (
            <TableRow key={inx} component='tr'>
              {generatedColumns.map((col, inx) => {
                return <TableCell key={inx}>{item[col]}</TableCell>
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
        <TableCell align='center' colSpan={11}>
          There is no placed order
        </TableCell>
      </TableRow>
    )
}
