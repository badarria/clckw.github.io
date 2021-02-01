import React from 'react'
import { MastersForm } from '../forms'
import { AdminContainer } from './admin-container'

export const Masters = () => {
  const columns = ['id', 'name', 'surname', 'city', 'rating']
  const initPaging = { limit: 10, offset: 0, orderby: 'id', order: 'desc', count: 50 }

  const containerProps = {
    subjName: 'masters',
    subjFormComponent: MastersForm,
    initPaging,
    columns,
  }

  return (
    <>
      <AdminContainer {...containerProps} />
    </>
  )
}
