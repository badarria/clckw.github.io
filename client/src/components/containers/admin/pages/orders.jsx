import React from 'react'
import { OrdersForm } from '../forms'
import { AdminContainer } from './admin-container'

export const Orders = () => {
  const columns = ['id', 'service', 'master', 'customer', 'city', 'date', 'begin', 'finish', 'rating']
  const initPaging = { limit: 15, offset: 0, orderby: 'date', order: 'desc', count: 50 }

  const containerProps = {
    subjName: 'orders',
    subjFormComponent: OrdersForm,
    initPaging,
    columns,
  }

  return (
    <>
      <AdminContainer {...containerProps} />
    </>
  )
}
