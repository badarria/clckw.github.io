import React from 'react'
import { ServicesForm } from '../forms'
import { AdminContainer } from './admin-container'

export const Services = () => {
  const columns = ['id', 'name', 'time']
  const initPaging = { limit: 5, offset: 0, orderby: 'time', order: 'asc', count: 50 }

  const containerProps = {
    subjName: 'services',
    subjFormComponent: ServicesForm,
    initPaging,
    columns,
  }

  return (
    <>
      <AdminContainer {...containerProps} />
    </>
  )
}
