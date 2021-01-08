import React, { useState } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { useRatingStyles } from '../../styles/styles'

export const RatingCard = (props) => {
  const classes = useRatingStyles()
  const { order, setRating } = props
  const { id = 0, customer = 'Customer' } = order
  const [value, setRatingValue] = useState(0)

  const submit = () => {
    setRating({ orderId: id, rating: value })
  }

  return (
    <Box component='fieldset' borderColor='transparent' className={classes.card}>
      {id ? (
        <>
          <Typography>Hi, {customer}!</Typography>
          <Box className={classes.card}>
            <Typography className={classes.ratingTitle}>Please, rate the quality of the master's work</Typography>
            <Rating name='order-rating' value={value} onChange={(e, rating) => setRatingValue(rating)} />
          </Box>
          <Button
            type='submit'
            onClick={submit}
            variant='contained'
            color='primary'
            className={classes.btn}
            disabled={!value}>
            Rate!
          </Button>
        </>
      ) : (
        <Typography>We are looking for your order, please wait ...</Typography>
      )}
    </Box>
  )
}
