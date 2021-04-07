import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { RootState } from '../store'
import { Masters } from '../components/containers/home/pages'

export const MastersRoute = ({ path }: { path: string }) => {
  const masters = useSelector((state: RootState) => state.masters)

  if (masters[0]?.id) return <Masters />
  else return <Redirect to='/' />
}
