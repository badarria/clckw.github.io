import React from 'react'
import { Dialog, DialogActions, DialogContent, Button, DialogContentText, DialogTitle } from '@material-ui/core'
import { ButtonIcon } from './button-icon'
import { AlertDialogProps } from '../../types'

export const AlertDialog = (props: AlertDialogProps) => {
  const [open, setOpen] = React.useState(false)
  const { icon = null, title, accept, question, description, disabled, type } = props

  const handleClickOpen = () => setOpen(true)

  const handleAccept = () => {
    accept()
    setOpen(false)
  }

  return (
    <>
      <ButtonIcon onClick={handleClickOpen} title={title} disabled={disabled} icon={icon} type={type} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id='alert-dialog-title'>{question}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAccept} color='primary' autoFocus>
            Ok
          </Button>
          <Button onClick={() => setOpen(false)} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

AlertDialog.defaultProps = {
  question: 'Are you sure?',
  description: 'This item will be permanently removed from the database',
}
