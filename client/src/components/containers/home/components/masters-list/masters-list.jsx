import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { MasterCard } from '../'

export const MastersList = ({ data, confirm }) => {
  const { wrap, title } = useStyles()

  return (
    data.length > 0 && (
      <Paper className={wrap}>
        <Typography align='center' className={title}>
          To place an order choose a master from the list below
        </Typography>
        {data.map(({ id, name, surname, rating }, inx) => (
          <MasterCard {...{ id, name, surname, rating, confirm }} key={inx} />
        ))}
      </Paper>
    )
  )
}

MastersList.defaultProps = {
  data: [],
}
