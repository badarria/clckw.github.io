import React from 'react'
import { Redirect } from 'react-router-dom'
import { User } from '../types'
import { Master } from '../components/containers'

export const MasterRoute = ({ user }: { user: User; path: string }) => {
  const { auth, role, id } = user

  return auth && role === 'master' ? <Master id={id} /> : <Redirect to='/' />
}
