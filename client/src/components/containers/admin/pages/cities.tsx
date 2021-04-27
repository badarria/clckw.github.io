import React, { useEffect, useState } from 'react'
import { AdminTable, AdminTableHead, Loader, Pagination } from '../components'
import { Response, Paging, City } from '../../../../types'
import { acceptCity, deleteCity, getCities } from 'services/admin/cities'
import { CitiesForm } from '../forms'
import { State } from '../../admin/types'

const columns = ['id', 'name']
const initPaging: Required<Paging> = { limit: 5, offset: 0, orderby: 'id', order: 'desc', count: 50 }
const initDataToChange: City = { id: 0, name: '' }

export const Cities = () => {
  const [editState, setEditState] = useState<State>(null)
  const [toast, setToast] = useState<Response>({ type: 'success', msg: '' })
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<City[]>([])
  const [paging, setPaging] = useState(initPaging)
  const [dataToChange, setDataToChange] = useState(initDataToChange)
  const { limit, offset, count, orderby, order } = paging

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

  const getItems = async () => {
    const res = await setLoader(getCities(paging))
    if ('items' in res) {
      const { items, count } = res
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
    const msg: Response = await setLoader(deleteCity(id))
    setToastMsg(msg)
    if (msg.type === 'success') {
      await getItems()
    }
  }

  const push = (data: City | string[]) => {
    if ('id' in data) {
      setDataToChange(data)
      setEditState('isEditing')
    } else setEditState('isCreating')
  }

  const cancel = () => {
    setEditState(null)
    setDataToChange(initDataToChange)
  }

  const accept = async (data: City) => {
    const toast = await setLoader(acceptCity(data, editState))
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
  const pagingProps = { option: { limit, offset, count }, setPaging: setChange }

  const tableProps = {
    items,
    columns,
    push,
    editState,
    remove,
    toast,
    form: <CitiesForm {...formProps} />,
    pagination: <Pagination {...pagingProps} />,
    header: <AdminTableHead {...headProps} />,
  }

  return (
    <>
      <Loader loading={loading} />
      <AdminTable {...tableProps} />
    </>
  )
}
