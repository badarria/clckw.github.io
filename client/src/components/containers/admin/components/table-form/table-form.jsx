import React from 'react'
import { Clear, Done } from '@material-ui/icons'
import { AlertDialog } from '../index'
import { TableRow, Box, TableCell } from '@material-ui/core'
import { useStyles } from './styles'

export const TableForm = ({ children, submit, reset }) => {
  const { btns, form, fields } = useStyles()

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
      <TableCell colSpan={12}>
        <form onSubmit={submit} className={form}>
          <Box className={fields}>{children}</Box>
          <Box className={btns}>
            <AlertDialog {...acceptDialogProps} />
            <AlertDialog {...resetDialogProps} />
          </Box>
        </form>
      </TableCell>
    </TableRow>
  )
}
