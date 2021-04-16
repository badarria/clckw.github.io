import React, { ChangeEvent, useState } from 'react'
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@material-ui/core'
import { useStyles } from './styles'
import { Rating } from '@material-ui/lab'

type Props = { data: { id: number; completed: boolean }; accept: (data: { id: number; rating: number }) => void }

export const RatingDialog = ({ accept, data }: Props) => {
  const { id, completed } = data
  const [open, setOpen] = useState(false)
  const [rating, setRatingValue] = useState(0)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const confirm = () => {
    accept({ id, rating })
    setOpen(false)
  }
  const getTitle = completed ? 'Set order rating' : "Order doesn't complete. You have to wait when master change status"
  const changeValue = (e: ChangeEvent<{}>, value: number | null) => value && setRatingValue(value)

  const { tooltip } = useStyles()
  return (
    <>
      <ButtonGroup>
        <Tooltip title={getTitle} classes={{ tooltip }}>
          <span>
            <Button color='primary' variant='contained' onClick={handleClickOpen} size='small' disabled={!completed}>
              Rate!
            </Button>
          </span>
        </Tooltip>
      </ButtonGroup>
      <Dialog open={open} onClose={handleClose} aria-labelledby='simple-dialog-title'>
        <DialogTitle id='alert-dialog'>Order completed. Please, rate it</DialogTitle>
        <DialogContent>
          <Rating value={rating} onChange={changeValue} />
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
