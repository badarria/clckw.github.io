import React from 'react'
import { TableCell, TableRow, Tooltip } from '@material-ui/core'
import { CustomerTableListProps, CustomerOrdersList } from '../../../../types'
import { RatingDialog } from '.'
import { Rating } from '@material-ui/lab'
import { useStyles } from './styles'

export const CustomerTableList = ({ data, columns, change }: CustomerTableListProps) => {
  const { tooltip } = useStyles()

  return (
    <>
      {data.map((item: CustomerOrdersList, inx: number) => {
        const { id, rating, completed } = item
        const isRated = completed && rating
        const isNotRatedYet = completed && !rating
        console.log(rating, completed)
        return (
          <TableRow key={inx} component='tr'>
            <TableCell component='td'>{inx + 1}</TableCell>
            {columns.map((col) => {
              const thisItem: any = { ...item }
              return (
                <>
                  {col !== 'rating' ? (
                    <TableCell component='td'>{thisItem[col]}</TableCell>
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
}
