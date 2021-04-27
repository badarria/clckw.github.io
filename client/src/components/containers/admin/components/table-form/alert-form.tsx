import React, { FC, useCallback } from 'react'
import { Box, Dialog, Button, DialogContent, DialogActions, DialogTitle } from '@material-ui/core'
import { useStyles } from './styles'

type Props = { submit: () => void; reset: () => void; title: string; open: boolean }

export const AlertForm: FC<Props> = ({ children, reset, submit, title, open }) => {
  const { alertBtnsBox, alertForm, fields } = useStyles()

  return (
    <Dialog open={open} onClose={reset} maxWidth='md'>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={submit} className={alertForm}>
          <Box className={fields}>{children}</Box>
          <DialogActions className={alertBtnsBox}>
            <Button
              type='submit'
              variant='contained'
              onClick={submit}
              color='primary'
              title={'Save and make changes to the database'}>
              Submit form
            </Button>

            <Button variant='contained' onClick={reset} title='Changes will not be saved'>
              Reset
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}
