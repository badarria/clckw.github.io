import React, { useState } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { useStyles } from './styles'

export const RatingCard = ({ order: { id, customer }, setRating }) => {
  const { card, title, btn } = useStyles()
  const [value, setRatingValue] = useState(0)

  const submit = () => {
    setRating({ orderId: id, rating: value })
  }

  return (
    <Box component='fieldset' borderColor='transparent' className={card}>
      {id ? (
        <>
          <Typography>Hi, {customer}!</Typography>
          <Box className={card}>
            <Typography className={title}>Please, rate the quality of the master's work</Typography>
            <Rating name='order-rating' value={value} onChange={(e, rating) => setRatingValue(rating)} />
          </Box>
          <Button type='submit' onClick={submit} variant='contained' color='primary' className={btn} disabled={!value}>
            Rate!
          </Button>
        </>
      ) : (
        <Typography>We are looking for your order, please wait ...</Typography>
      )}
    </Box>
  )
}

RatingCard.defaultProps = {
  order: { id: 0, customer: 'Customer' },
}
