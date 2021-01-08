import React from 'react'
import { Clear, Done } from '@material-ui/icons'
import AlertDialog from '../alert-dialog'
import { TableRow, Box, TableCell } from '@material-ui/core'
import { useTableFormStyles } from '../../styles/styles'

export const BasicTableForm = (props) => {
  const classes = useTableFormStyles()
  const { children, submit, reset } = props

  const acceptDialogProps = {
    icon: <Done fontSize='small' />,
    title: 'Submit form',
    question: 'Submit form?',
    description: 'Save and make changes to the database',
    accept: submit,
  }

  const resetDialogProps = {
    icon: <Clear fontSize='small' />,
    title: 'Reset all changes',
    question: 'Reset form?',
    description: 'Changes will not be saved',
    type: 'reset',
    accept: reset,
  }

  return (
    <TableRow>
      <TableCell colSpan={11}>
        <form onSubmit={submit} className={classes.form}>
          <Box className={classes.fields}>{children}</Box>
          <Box className={classes.buttons}>
            <AlertDialog {...acceptDialogProps} />
            <AlertDialog {...resetDialogProps} />
          </Box>
        </form>
      </TableCell>
    </TableRow>
  )
}
