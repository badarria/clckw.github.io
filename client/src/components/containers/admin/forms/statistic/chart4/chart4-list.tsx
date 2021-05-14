import React from 'react'
import { TableCell, TableRow } from '@material-ui/core'
import { Chart4Res } from 'components/containers/admin/types'

type Props = {
  data: Chart4Res[]
}

export const Chart4List = ({ data }: Props) => {
  return (
    <>
      {data.map((item: Chart4Res, inx: number) => {
        const { types, master, count, iscompleted, isnotcompleted, price, rating } = item

        return (
          <TableRow key={inx} component='tr'>
            <TableCell>
              {master}
              <TableRow>{master}</TableRow>
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}
