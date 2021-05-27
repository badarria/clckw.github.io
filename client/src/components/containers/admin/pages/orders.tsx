import React, { useEffect, useState } from 'react'
import { AdminTable, AdminTableHead, Loader, Pagination } from '../components'
import { Response, Paging, Order } from '../../../../types'
import { acceptOrder, deleteOrder, getOrders } from 'services/admin/orders'
import { OrdersForm } from '../forms'
import { State, NewOrder, FilterQuery } from '../../../containers/admin/types'
import OrdersFilter from '../forms/orders/orders-filter'

const columns = ['id', 'service', 'price', 'master', 'customer', 'city', 'date', 'begin', 'finish', 'rating', 'status']
const initPaging: Required<Paging> = { limit: 15, offset: 0, orderby: 'date', order: 'desc', count: 50 }
const initDataToChange = {
  id: 0,
  m: { id: 0, fullName: '' },
  c: { id: 0, fullName: '' },
  s: { id: 0, service: '', service_time: '' },
  begin: '',
  date: '',
  status: 'done',
}

export const Orders = () => {
  const [editState, setEditState] = useState<State>(null)
  const [toast, setToast] = useState<Response>({ type: 'success', msg: '' })
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<Order[]>([])
  const [paging, setPaging] = useState(initPaging)
  const [dataToChange, setDataToChange] = useState(initDataToChange)
  const { limit, offset, count, orderby, order } = paging
  const [filtered, setFiltered] = useState<FilterQuery>({})

  const setLoader = async <T extends any>(doSomething: T) => {
    setLoading(true)
    const res = await doSomething
    setLoading(false)
    return res
  }

  const setToastMsg = (toast: Response) => {
    setToast(toast)
    setTimeout(() => {
      setToast({ type: toast.type, msg: '' })
    }, 3000)
  }

  const changeFiltered = (data: FilterQuery) => {
    const newData = Object.entries(data).length
    const currentData = Object.entries(filtered).length
    if (newData === currentData && !newData) return
    setFiltered(data)
  }

  const getItems = async () => {
    const res = await setLoader(getOrders({ ...paging, ...filtered }))
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
    const msg: Response = await setLoader(deleteOrder(id))
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

  const accept = async (data: NewOrder) => {
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
  }, [paging, filtered])

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
    header: <AdminTableHead {...headProps} />,
    filter: <OrdersFilter changeFiltered={changeFiltered} />,
  }

  return (
    <>
      <Loader loading={loading} />
      {editState && <OrdersForm {...formProps} />}
      <AdminTable {...tableProps} />
    </>
  )
}
