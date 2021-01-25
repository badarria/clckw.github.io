import React from 'react'
import { Alert } from '@material-ui/lab'
import { Slide } from '@material-ui/core'
import { useStyles } from './styles'

export const Toast = ({ toast: { type, msg } }) => {
  const { msgBox } = useStyles()

  return (
    <Slide direction='left' in={!!msg}>
      <Alert severity={type} className={msgBox}>
        {msg}
      </Alert>
    </Slide>
  )
}
