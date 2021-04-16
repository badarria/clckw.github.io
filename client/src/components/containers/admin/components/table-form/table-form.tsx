import React, { FC, FormEvent } from 'react'
import { Clear, Done } from '@material-ui/icons'
import { AlertDialog } from '..'
import { TableRow, Box, TableCell } from '@material-ui/core'
import { useStyles } from './styles'
import { BtnType } from 'types'

type Props = { submit: () => void; reset: () => void }

export const TableForm: FC<Props> = ({ children, submit, reset }) => {
  const { btns, form, fields } = useStyles()

  const acceptDialogProps = {
    icon: <Done fontSize='small' />,
    title: 'Submit form',
    question: 'Submit form?',
    description: 'Save and make changes to the database',
    type: 'button' as BtnType,
    accept: submit,
    disabled: false,
  }
  const resetDialogProps = {
    icon: <Clear fontSize='small' />,
    title: 'Reset all changes',
    question: 'Reset form?',
    description: 'Changes will not be saved',
    type: 'reset' as BtnType,
    accept: reset,
    disabled: false,
  }

  return (
    <TableRow>
      <TableCell colSpan={14}>
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
