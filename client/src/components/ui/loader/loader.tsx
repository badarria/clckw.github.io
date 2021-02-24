import React from 'react'
import { CircularProgress, Backdrop } from '@material-ui/core'
import { useStyles } from './styles'
import { LoaderProps } from 'types'

export const Loader = ({ loading }: LoaderProps) => {
  const { backdrop } = useStyles()

  return (
    <Backdrop className={backdrop} open={loading}>
      <CircularProgress color='primary' />
    </Backdrop>
  )
}
