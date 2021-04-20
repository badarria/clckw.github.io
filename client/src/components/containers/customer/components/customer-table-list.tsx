import React from 'react'
import { TableCell, TableRow, Tooltip } from '@material-ui/core'
import { OrdersList, Columns } from '../types'
import { RatingDialog } from '.'
import { Rating } from '@material-ui/lab'
import { useStyles } from './styles'

export type Props = {
  data: OrdersList[]
  columns: Columns
  change: ({ id, rating }: { id: number; rating: number }) => void
}

export const CustomerTableList = ({ data, columns, change }: Props) => {
  const { tooltip } = useStyles()

  if (data.length)
    return (
      <>
        {data.map((item: OrdersList, inx: number) => {
          const { id, rating, completed } = item
          const isRated = completed && rating

          return (
            <TableRow key={inx} component='tr'>
              <TableCell component='td'>{inx + 1}</TableCell>
              {columns.map((col) => {

                return (
                  <>
                    {col !== 'rating' ? (
                      <TableCell component='td'>{item[col]}</TableCell>
                    ) : (
                      <TableCell>
                        {isRated ? (
                          <Tooltip title='Order already rated' classes={{ tooltip }}>
                            <span>
                              <Rating value={rating} disabled size='small' />
                            </span>
                          </Tooltip>
                        ) : (
                          <RatingDialog accept={change} data={{ completed, id }} />
                        )}
                      </TableCell>
                    )}
                  </>
                )
              })}
            </TableRow>
          )
        })}
      </>
    )
  else
    return (
      <TableRow component='tr'>
        <TableCell align='center' colSpan={10} component='td'>
          There is no placed order
        </TableCell>
      </TableRow>
    )
}
