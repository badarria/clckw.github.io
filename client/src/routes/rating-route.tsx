import React from 'react'
import { useRouteMatch, Redirect } from 'react-router-dom'
import { Rating } from '../components/containers'

export const RatingRoute = ({ path }: { path: string }) => {
  const match: { params: { id?: string } } | null = useRouteMatch('/orderRate/:id')
  if (match?.params?.id) {
    const id: string = match?.params?.id
    return <Rating id={Number(id)} />
  } else return <Redirect to='/' />
}
