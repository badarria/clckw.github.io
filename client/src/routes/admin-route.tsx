import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useRouteMatch } from 'react-router-dom'
import { RootState } from 'store'
import { Admin } from '../components/containers'

type Props = { tabs: ReactElement; post: ReactElement; path: string }

export const AdminRoute = ({ post, tabs }: Props) => {
  const user = useSelector((state: RootState) => state.user)
  const match = useRouteMatch('/admin/post')
  const isAdmin = user && user.role === 'admin'

  if (isAdmin && match) return post

  if (isAdmin) return <Admin tabs={tabs} />

  return <Redirect to='/' />
}
