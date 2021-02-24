import React from 'react'
import { Alert } from '@material-ui/lab'
import { Slide } from '@material-ui/core'
import { useStyles } from './styles'
import { ToastProps } from 'types'

export const Toast = ({ toast: { type, msg } }: ToastProps) => {
  const { msgBox } = useStyles()

  return (
    <Slide direction='left' in={!!msg}>
      <Alert severity={type} className={msgBox}>
        {msg}
      </Alert>
    </Slide>
  )
}

Toast.defaultProps = {
  toast: { type: 'success', msg: '' },
}
