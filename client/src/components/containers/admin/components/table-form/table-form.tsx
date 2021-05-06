import React, { FC } from 'react'
import { Box, Dialog, Button, DialogContent, DialogActions, DialogTitle } from '@material-ui/core'
import { useStyles } from './styles'

type Props = { submit: () => void; cancel: () => void; title: string }

export const TableForm: FC<Props> = ({ children, cancel, submit, title }) => {
  const { alertBtnsBox, alertForm, fields } = useStyles()

  return (
    <Dialog open={true} onClose={cancel} maxWidth='md'>
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

            <Button variant='contained' onClick={cancel} title='Changes will not be saved'>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}
