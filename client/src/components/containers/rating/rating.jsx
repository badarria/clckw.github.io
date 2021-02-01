import React, { useEffect, useState } from 'react'
import { Container, Paper } from '@material-ui/core'
import { getOrder, setRating } from '../../../services/rating'
import { useStyles } from './styles'
import { NoRatingCard, RatingCard, Loader } from './rating-cards'

export const Rating = ({ orderId }) => {
  const { blank } = useStyles()
  const [{ rated, msg }, setStatus] = useState({
    rated: true,
    msg: 'We are looking for your order, please wait...',
  })
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState({})

  useEffect(() => {
    const orderData = async () => {
      setLoading(true)
      const res = await getOrder(orderId)
      if (Array.isArray(res)) {
        setOrder(res[0])
        setStatus({ rated: !!res[0].rating, msg: 'Order already has been rated, thanks!' })
      } else setStatus(res)
      setLoading(false)
    }
    orderData()
  }, [])

  const submit = async (data) => {
    setLoading(true)
    const res = await setRating(data)
    setStatus(res)
    setLoading(false)
  }

  return (
    <>
      <Loader loading={loading} />
      <Container>
        <Paper className={blank}>{rated ? <NoRatingCard {...{ msg }} /> : <RatingCard {...{ order, submit }} />}</Paper>
      </Container>
    </>
  )
}
