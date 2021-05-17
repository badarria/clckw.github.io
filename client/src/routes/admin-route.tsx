import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useRouteMatch } from 'react-router-dom'
import { RootState } from 'store'
import { Admin } from '../components/containers'

type Props = { tabs: ReactElement; post: ReactElement; statistic: ReactElement }

export const AdminRoute = ({ post, tabs, statistic }: Props) => {
  const user = useSelector((state: RootState) => state.user)
  const isPost = useRouteMatch('/admin/post')
  const isStatistic = useRouteMatch('/admin/statistic')
  const isAdmin = user && user.role === 'admin'

  if (!isAdmin) return <Redirect to='/' />

  if (isPost) return post
  if (isStatistic) return statistic

  return <Admin tabs={tabs} />
}
