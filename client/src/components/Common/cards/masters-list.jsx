import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import { useMasterListStyle } from '../../styles/styles'
import { BasicCard } from './card'

export const MastersList = ({ data = [], accept }) => {
  const classes = useMasterListStyle()
  return (
    <Paper className={classes.listWrap}>
      <Typography align='center' className={classes.title}>
        To place an order choose a master from the list below
      </Typography>
      {data.map(({ id, name, surname, rating }, inx) => (
        <BasicCard {...{ id, name, surname, rating, accept }} key={inx} />
      ))}
    </Paper>
  )
}
