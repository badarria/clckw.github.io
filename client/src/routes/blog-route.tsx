import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { Blog } from '../components/containers/home/pages'
import { Article } from '../components/containers/home/components'

export const BlogRoute = ({ path }: { path: string }) => {
  const isMatch = useRouteMatch<{ id: string }>({ path: '/blog/:id' })
  console.log('here')
  if (!isMatch) return <Route path={path} exact component={Blog} />

  const id = isMatch?.params.id

  return <Article id={id} />
}
