import { Container, Box, Paper, TableBody, Table, TableContainer, TableFooter } from '@material-ui/core'
import { Loader, Toast } from '../../ui'
import React, { useEffect, useState } from 'react'
import { Paging, Response } from '../../../types'
import { Pagination, CustomerTableHead, CustomerTableList } from './components'
import { useStyles } from './styles'
import { getList, setRating } from '../../../services/customer'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useHistory } from 'react-router-dom'
import { List, Columns } from './types'

const columns: Columns = ['id', 'master', 'service', 'date', 'begin', 'finish', 'rating']

export const Customer = () => {
  const user = useSelector((state: RootState) => state.user)
  const [orders, setOrders] = useState<List[]>([])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<Response>({ type: 'success', msg: '' })
  const initPaging: Required<Paging> = { limit: 5, offset: 0, order: 'desc', orderby: 'date', count: orders.length }
  const [paging, setPaging] = useState(initPaging)
  const { wrap, box, root, table, container } = useStyles()
  const { order, orderby, limit, offset, count } = paging
  const history = useHistory()

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

  const getOrdersList = async (sayHi = false) => {
    if (!user) return history.replace('/')

    const orders = await setLoader(getList({ ...paging, id: user.id }))
    if ('type' in orders) setToastMsg(orders)
    else if (!orders.rows.length) {
      const toast: Response = { type: 'warning', msg: `Hi, ${user.name}, you haven't orders` }
      setToastMsg(toast)
    } else {
      const { rows, count } = orders
      const data: List[] = []
      rows.forEach(({ id, s, m, date, begin, finish, rating, completed }) => {
        const dataForList: List = {
          id,
          master: m?.fullName,
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
      const toast: Response = { type: 'success', msg: `Hi, ${user.name}, you have ${count} orders. ` }
      sayHi && setToastMsg(toast)
      if (count !== paging.count) setPaging((paging) => ({ ...paging, count }))
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
