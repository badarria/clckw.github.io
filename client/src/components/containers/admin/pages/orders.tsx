import React, { useEffect, useState } from 'react'
import { AdminTable, AdminTableHead, Loader, Pagination } from '../components'
import { TypicalResponse, Paging, State, Order, NewOrderData } from 'types'
import { acceptOrder, deleteOrder, getOrders } from 'services/admin/orders'
import { OrdersForm } from '../forms'

export const Orders = () => {
  const columns = ['id', 'service', 'master', 'customer', 'city', 'date', 'begin', 'finish', 'rating', 'status']
  const initPaging: Paging = { limit: 15, offset: 0, orderby: 'date', order: 'desc', count: 50 }
  const initDataToChange = {
    id: 0,
    m: { id: 0, fullName: '' },
    c: { id: 0, fullName: '' },
    s: { id: 0, service: '', service_time: '' },
    begin: '',
    date: '',
    status: 'done',
  }

  const [editState, setEditState] = useState<State>(null)
  const [toast, setToast] = useState<TypicalResponse>({ type: 'success', msg: '' })
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<Order[]>([])
  const [paging, setPaging] = useState<Paging>(initPaging)
  const [dataToChange, setDataToChange] = useState(initDataToChange)
  const { limit, offset, count, orderby, order } = paging
  console.log(items)
  const setLoader = async <T extends any>(doSomething: T) => {
    setLoading(true)
    const res = await doSomething
    setLoading(false)
    return res
  }

  const setToastMsg = (toast: TypicalResponse) => {
    setToast(toast)
    setTimeout(() => {
      setToast({ type: toast.type, msg: '' })
    }, 3000)
  }

  const getItems = async () => {
    const res = await setLoader(getOrders(paging))
    if ('items' in res) {
      let { items, count } = res
      if (paging.count !== count) {
        setPaging((paging) => {
          return { ...paging, count }
        })
      }

      setItems(items)
    } else {
      setToastMsg(res)
    }
  }

  const remove = async (id: number) => {
    const msg: TypicalResponse = await setLoader(deleteOrder(id))
    setToastMsg(msg)
    if (msg.type === 'success') {
      await getItems()
    }
  }

  const push = async (data: Order | string[]) => {
    if ('id' in data) {
      setDataToChange(data)
      setEditState('isEditing')
    } else setEditState('isCreating')
  }

  const cancel = () => {
    setEditState(null)
    setDataToChange(initDataToChange)
  }

  const accept = async (data: NewOrderData) => {
    const toast = await setLoader(acceptOrder(data, editState))
    if (toast.type === 'success') {
      cancel()
      await getItems()
    }
    setToastMsg(toast)
  }

  const setChange = async (data: Paging) => {
    setPaging((paging) => ({ ...paging, ...data }))
  }

  useEffect(() => {
    getItems()
  }, [paging])

  const formProps = { data: dataToChange, cancel, accept, editState }
  const headProps = { columns, push, order, orderby, setChange }
  const pagingProps = {
    option: { limit, offset, count },
    setPaging: setChange,
  }

  const tableProps = {
    items,
    columns,
    push,
    editState,
    remove,
    toast,
    pagination: <Pagination {...pagingProps} />,
    header: editState ? <OrdersForm {...formProps} /> : <AdminTableHead {...headProps} />,
  }

  return (
    <>
      <Loader loading={loading} />
      <AdminTable {...tableProps} />
    </>
  )
}
