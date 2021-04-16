import React from 'react'
import { Alert } from '@material-ui/lab'
import { Slide } from '@material-ui/core'
import { useStyles } from './styles'
import { Response } from 'types'

export const Toast = ({ toast: { type, msg } }: { toast: Response }) => {
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
