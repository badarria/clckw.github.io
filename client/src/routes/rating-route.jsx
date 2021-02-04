import React from 'react'
import { useRouteMatch, Redirect } from 'react-router-dom'
import { Rating } from '../components/containers'

export const RatingRoute = () => {
  const match = useRouteMatch('/orderRate/:orderId')
  const orderId = match?.params?.orderId || false
  return orderId ? <Rating {...{ orderId }} /> : <Redirect to='/' />
}
