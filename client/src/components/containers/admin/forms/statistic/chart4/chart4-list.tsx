import React from 'react'
import { Box, TableCell, TableRow, Typography } from '@material-ui/core'
import { Chart4ResList } from 'components/containers/admin/types'
import { useStyles } from '../styles'

type Props = {
  data: Chart4ResList[]
  servicesKeys: string[]
}

export const Chart4List = ({ data, servicesKeys }: Props) => {
  const { noDataBox } = useStyles()

  if (!data.length)
    return (
      <Box className={noDataBox}>
        <Typography>There is no data for this period</Typography>
      </Box>
    )

  return (
    <>
      {data.map((item, inx) => {
        const { types = [], master, orders, iscompleted, isnotcompleted, price, rating } = item

        return (
          <TableRow key={inx} component='tr'>
            <TableCell>{master}</TableCell>
            <TableCell>{orders || '-'}</TableCell>
            {servicesKeys.map((key) => {
              let res: number | string = '-'
              types &&
                types.forEach((item) => {
                  if (key in item) return (res = item[key])
                })
              return <TableCell>{res}</TableCell>
            })}
            <TableCell>{iscompleted || '-'}</TableCell>
            <TableCell>{isnotcompleted || '-'}</TableCell>
            <TableCell>{rating || 'not rated yet'}</TableCell>
            <TableCell>{price || '-'}</TableCell>
          </TableRow>
        )
      })}
    </>
  )
}
