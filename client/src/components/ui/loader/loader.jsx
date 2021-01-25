import React from 'react'
import { CircularProgress, Backdrop } from '@material-ui/core'
import { useStyles } from './styles'

export const Loader = ({ loading }) => {
  const { backdrop } = useStyles()

  return (
    <Backdrop className={backdrop} open={loading}>
      <CircularProgress color='primary' />
    </Backdrop>
  )
}
