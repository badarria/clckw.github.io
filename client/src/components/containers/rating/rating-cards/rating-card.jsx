import React, { useState } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { useStyles } from './styles'

export const RatingCard = ({ order: { id, customer }, submit }) => {
  const { card, title, btn } = useStyles()
  const [value, setRatingValue] = useState(0)

  const setRating = () => submit({ orderId: id, rating: value })
  const changeValue = (e, rating) => setRatingValue(rating)

  return (
    <Box component='fieldset' borderColor='transparent' className={card}>
      <>
        <Typography>Hi, {customer}!</Typography>
        <Box className={card}>
          <Typography className={title}>Please, rate the quality of the master's work</Typography>
          <Rating name='order-rating' value={value} onChange={changeValue} />
        </Box>
        <Button type='submit' onClick={setRating} variant='contained' color='primary' className={btn} disabled={!value}>
          Rate!
        </Button>
      </>
    </Box>
  )
}

RatingCard.defaultProps = {
  order: { id: 0, customer: 'Customer' },
}