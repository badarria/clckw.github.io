import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { MasterCard } from '../_elements'

export const MastersList = ({ data, accept }) => {
  const { wrap, title } = useStyles()
  return (
    <Paper className={wrap}>
      <Typography align='center' className={title}>
        To place an order choose a master from the list below
      </Typography>
      {data.map(({ id, name, surname, rating }, inx) => (
        <MasterCard {...{ id, name, surname, rating, accept }} key={inx} />
      ))}
    </Paper>
  )
}

MastersList.defaultProps = {
  data: [],
}
