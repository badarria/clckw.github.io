import React from 'react'
import { Route } from 'react-router-dom'

import { Search } from '../components/containers/home/pages'

export const SearchRoute = ({ path }: { path: string }) => {
  return <Search />
}
