import React, { FC } from 'react'
import { Clear, Done } from '@material-ui/icons'
import { AlertDialog } from '..'
import { TableRow, Box, TableCell } from '@material-ui/core'
import { useStyles } from './styles'
import { TableFormProps } from 'types'

export const TableForm: FC<TableFormProps> = ({ children, submit, reset }) => {
  const { btns, form, fields } = useStyles()

  const acceptDialogProps = {
    icon: <Done fontSize='small' />,
    title: 'Submit form',
    question: 'Submit form?',
    description: 'Save and make changes to the database',
    type: 'button',
    accept: submit,
    disabled: false,
  }
  const resetDialogProps = {
    icon: <Clear fontSize='small' />,
    title: 'Reset all changes',
    question: 'Reset form?',
    description: 'Changes will not be saved',
    type: 'reset',
    accept: reset,
    disabled: false,
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
