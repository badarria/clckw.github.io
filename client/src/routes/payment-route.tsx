import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { RootState } from '../store'
import { Payment } from '../components/containers/home/pages'

export const PaymentRoute = ({ path }: { path: string }) => {
  const orderData = useSelector((state: RootState) => state.orderData)

  if (orderData && orderData.master.id) return <Payment />
  return <Redirect to='/' />
}
