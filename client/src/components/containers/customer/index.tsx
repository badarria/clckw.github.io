import { Container, Box, Paper, TableBody, Table, TableContainer, TableFooter } from '@material-ui/core'
import { Loader, Toast } from '../../ui'
import React, { useEffect, useState } from 'react'
import { UsersOrdersList, Paging, TypicalResponseType, CustomerOrdersList } from '../../../types'
import { Pagination, CustomerTableHead, CustomerTableList } from './components'
import { useStyles } from './styles'
import { getList, setRating } from '../../../services/customer'
import { useSelector } from 'react-redux'
import { RootState } from 'store'

const initOrder: UsersOrdersList = {
  id: 0,
  master: '',
  service: '',
  completed: false,
  begin: '',
  date: '',
  finish: '',
  rating: 0,
}
const columns = ['id', 'master', 'service', 'date', 'begin', 'finish', 'rating']

export const Customer = () => {
  const { id, name } = useSelector((state: RootState) => state.user || { id: 0, name: '' })
  const [orders, setOrders] = useState([initOrder])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<TypicalResponseType>({ type: 'success', msg: '' })
  const initPaging: Paging = { limit: 5, offset: 0, order: 'desc', orderby: 'date', count: orders.length }
  const [paging, setPaging] = useState(initPaging)
  const { wrap, box, root, table, container } = useStyles()
  const { order, orderby, limit, offset, count } = paging

  const setLoader = async <T extends any>(doSomething: T) => {
    setLoading(true)
    const res = await doSomething
    setLoading(false)
    return res
  }

  const setToastMsg = (toast: TypicalResponseType) => {
    setToast(toast)
    setTimeout(() => {
      setToast({ type: toast.type, msg: '' })
    }, 3000)
  }

  const getOrdersList = async (sayHi = false) => {
    const list = await setLoader(getList({ ...paging, id }))
    if ('type' in list) setToastMsg(list)
    else if (!list.length) {
      const toast: TypicalResponseType = { type: 'warning', msg: `Hi, ${name}, you haven't orders` }
      setToastMsg(toast)
    } else {
      const data: CustomerOrdersList[] = []
      list.forEach(({ id, s, m, date, begin, finish, rating, completed }) => {
        const dataForList = {
          id,
          master: m.fullName,
          service: s?.service,
          date,
          begin,
          finish,
          rating,
          completed,
        }
        data.push(dataForList)
      })
      setOrders(data)
      const toast: TypicalResponseType = { type: 'success', msg: `Hi, ${name}, you have ${data.length} orders. ` }
      sayHi && setToastMsg(toast)
      if (list.length !== paging.count) setPaging((paging) => ({ ...paging, count: list.length }))
    }
  }

  useEffect(() => {
    if (!loading) {
      getOrdersList(true)
    }
  }, [])

  const setChange = async (data: Paging) => {
    setPaging((paging) => ({ ...paging, ...data }))
  }

  useEffect(() => {
    getOrdersList()
  }, [paging])

  const changeRating = async (data: { id: number; rating: number }) => {
    const result = await setLoader(setRating(data))
    setToastMsg(result)
    if (result.type !== 'error') {
      getOrdersList()
    }
  }

  const headerProps = { columns, order, orderby, setChange }
  const paginatorProps = { option: { limit, offset, count }, setPaging: setChange }

  return (
    <Container className={container}>
      <Loader loading={loading} />
      <Box className={wrap}>
        <Box className={box}>
          <Toast toast={toast} />
        </Box>
        <TableContainer component={Paper} className={root}>
          <Table className={table} aria-label={`table`}>
            <CustomerTableHead {...headerProps} />
            <TableBody>
              <CustomerTableList data={orders} columns={columns} change={changeRating} />
            </TableBody>
            <TableFooter>
              <Pagination {...paginatorProps} />
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  )
}
