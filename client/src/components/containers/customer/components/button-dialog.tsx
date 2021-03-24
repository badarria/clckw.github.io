import React, { FC, useState } from 'react'
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from '@material-ui/core'
import { useStyles } from './styles'

export const ButtonDialog: FC<{ isDisabled: boolean; accept: Function }> = ({ accept, isDisabled }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const confirm = () => {
    accept()
    setOpen(false)
  }
  const getTitle = (status: boolean) => {
    return status ? 'Order completed. You cannot change this' : 'Set order done'
  }
  const { tooltip } = useStyles()
  return (
    <>
      <ButtonGroup>
        <Tooltip title={getTitle(isDisabled)} classes={{ tooltip }}>
          <span>
            <Button color='primary' variant='contained' onClick={handleClickOpen} size='small' disabled={isDisabled}>
              Done
            </Button>
          </span>
        </Tooltip>
      </ButtonGroup>
      <Dialog open={open} onClose={handleClose} aria-labelledby='simple-dialog-title'>
        <DialogTitle id='alert-dialog'>Orders status</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Do you confirm that the order was completed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirm} color='primary' autoFocus>
            Ok
          </Button>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
