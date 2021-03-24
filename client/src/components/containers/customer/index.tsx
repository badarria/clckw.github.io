import { Container, Box, Paper, TableBody, Table, TableContainer, TableFooter } from '@material-ui/core'
import { Loader, Toast } from '../../ui'
import React, { useEffect, useState } from 'react'
import {
  DataForRatingRequest,
  MasterOrdersList,
  UsersOrdersList,
  Paging,
  TypicalResponse,
  CustomerOrdersList,
} from '../../../types'
import { Pagination, MasterTableHead, CustomerTableList } from './components'
import { useStyles } from './styles'
import { getList, setRating } from '../../../services/customer'

export const Customer = ({ id }: { id: number }) => {
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
  const initPaging: Paging = { limit: 5, offset: 0, order: 'desc', orderby: 'date', count: 50 }
  const columns = ['id', 'master', 'service', 'date', 'begin', 'finish', 'rating', 'completed']

  const [orders, setOrders] = useState([initOrder])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<TypicalResponse>({ type: 'success', msg: '' })
  const [paging, setPaging] = useState(initPaging)
  const { wrap, box, root, table, container } = useStyles()
  const { order, orderby, limit, offset, count } = paging

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

  const getOrdersList = async () => {
    const list = await setLoader(getList({ ...paging, id }))
    if ('type' in list) setToastMsg(list)
    else if (!list.length) {
      const toast: TypicalResponse = { type: 'warning', msg: "You haven't orders" }
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
      if (list.length !== paging.count) setPaging((paging) => ({ ...paging, count: list.length }))
    }
  }

  useEffect(() => {
    if (!loading) {
      getOrdersList()
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
            <MasterTableHead {...headerProps} />
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
