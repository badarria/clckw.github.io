import React from 'react'
import { CitiesForm } from '../forms'
import { AdminContainer } from './admin-container'

export const Cities = () => {
  const columns = ['id', 'name']
  const initPaging = { limit: 5, offset: 0, orderby: 'id', order: 'desc', count: 50 }

  const containerProps = {
    subjName: 'cities',
    subjFormComponent: CitiesForm,
    initPaging,
    columns,
  }

  return (
    <>
      <AdminContainer {...containerProps} />
    </>
  )
}
