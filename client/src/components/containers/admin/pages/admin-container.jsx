import React, { useEffect, useState } from 'react'
import { AdminTable, AdminTableHead, Loader, Pagination } from '../components'
import { acceptChanges, loadItems, pushToChange, removeFromDB } from '../../../../services/admin'

export const AdminContainer = ({ subjName, subjFormComponent, columns, initPaging }) => {
  const [editState, setEditState] = useState(null)
  const [toast, setToast] = useState('')
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [paging, setPaging] = useState(initPaging)
  const [dataToChange, setDataToChange] = useState({})
  const { limit, offset, count, orderby, order } = paging

  const setLoader = async (doSomething) => {
    setLoading(true)
    const res = await doSomething
    setLoading(false)
    return res
  }

  const setToastMsg = (toast) => {
    setToast(toast)
    setTimeout(() => {
      setToast({ type: toast.type, msg: '' })
    }, 3000)
  }

  const getItems = async () => {
    const res = await setLoader(loadItems(subjName, paging))
    if (res?.items) {
      setItems(res.items)
      setPaging(res.paging)
    } else {
      setToastMsg(res)
    }
  }

  const remove = async (id) => {
    const msg = await setLoader(removeFromDB(subjName, id))
    setToastMsg(msg)
    if (msg.type === 'success') {
      await getItems()
    }
  }

  const push = async (data, state) => {
    const toChange = await setLoader(pushToChange(subjName, data))
    setDataToChange(toChange)
    setEditState(state)
  }

  const cancel = () => {
    setEditState(null)
    setDataToChange({})
  }

  const accept = async (data) => {
    const toast = await setLoader(acceptChanges(subjName, data, editState))
    if (toast.type === 'success') {
      cancel()
      await getItems()
    }
    setToastMsg(toast)
  }

  const setChange = async (data) => {
    setPaging((paging) => {
      return { ...paging, ...data }
    })
  }

  useEffect(() => {
    getItems()
  }, [paging])

  const Form = (props) => subjFormComponent(props)

  const formProps = { data: dataToChange, cancel, accept }
  const headProps = { columns, push, order, orderby, setChange }
  const pagingProps = { option: { limit, offset, count }, setPaging: setChange }

  const tableProps = {
    items,
    columns,
    push,
    editState,
    remove,
    toast,
    pagination: <Pagination {...pagingProps} />,
    header: editState ? <Form {...formProps} /> : <AdminTableHead {...headProps} />,
  }

  return (
    <>
      <Loader loading={loading} />
      <AdminTable {...tableProps} />
    </>
  )
}
