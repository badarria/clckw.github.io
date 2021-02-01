import React from 'react'
import { CustomersForm } from '../forms'
import { AdminContainer } from './admin-container'

export const Customers = () => {
  const columns = ['id', 'name', 'surname', 'email']
  const initPaging = { limit: 10, offset: 0, orderby: 'id', order: 'desc', count: 50 }

  const containerProps = {
    subjName: 'customers',
    subjFormComponent: CustomersForm,
    initPaging,
    columns,
  }

  return (
    <>
      <AdminContainer {...containerProps} />
    </>
  )
}
