import React from 'react'
import { useRouteMatch, Redirect } from 'react-router-dom'
import { Rating } from '../components/containers'

export const RatingRoute = ({ path }: { path: string }) => {
  const match: { params: { orderId?: string } } | null = useRouteMatch('/orderRate/:orderId')
  if (match?.params?.orderId) {
    const orderId: string = match?.params?.orderId
    return <Rating {...{ orderId }} />
  } else return <Redirect to='/' />
}
