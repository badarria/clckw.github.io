import { Container, Box, Paper, TableBody, Table, TableContainer, TableFooter } from '@material-ui/core'
import { Loader, Toast } from 'components/ui'
import React, { useEffect, useState } from 'react'
import { DataForRatingRequest, MasterOrdersList, Paging, TypicalResponse } from 'types'
import { Pagination, MasterTableHead, MasterTableList } from './components'
import { useStyles } from './styles'
import { getList, setDone } from '../../../services/master'

export const Master = ({ id }: { id: number }) => {
  const initOrder: MasterOrdersList = {
    id: 0,
    customer: '',
    userEmail: '',
    service: '',
    completed: false,
    begin: '',
    date: '',
    finish: '',
    rating: 0,
  }
  const initPaging: Paging = { limit: 10, offset: 0, order: 'desc', orderby: 'date', count: 50 }
  const columns = ['id', 'customer', 'service', 'date', 'begin', 'finish', 'rating', 'completed']

  const [orders, setOrders] = useState([initOrder])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<TypicalResponse>({ type: 'success', msg: '' })
  const [paging, setPaging] = useState(initPaging)
  const { wrap, box, root, table } = useStyles()
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
      const data: MasterOrdersList[] = []
      list.forEach(({ id, c, s, date, begin, finish, rating, completed }) => {
        const dataForList = {
          id,
          customer: c?.fullName,
          userEmail: c?.email,
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
      if (list.length !== orders.length) setPaging((paging) => ({ ...paging, count: list.length }))
    }
  }

  useEffect(() => {
    if (!loading) {
      getOrdersList()
    }
  }, [])

  const setChange = async (data: Paging) => {
    console.log(data, 'setchange')
    setPaging((paging) => ({ ...paging, ...data }))
  }

  useEffect(() => {
    getOrdersList()
  }, [paging])

  const changeStatus = async (data: DataForRatingRequest) => {
    const result = await setLoader(setDone(data))
    setToastMsg(result)
    if (result.type !== 'error') {
      getOrdersList()
    }
  }

  const headerProps = { columns, order, orderby, setChange }
  const paginatorProps = { option: { limit, offset, count }, setPaging: setChange }

  return (
    <Container>
      <Loader loading={loading} />
      <Box className={wrap}>
        <Box className={box}>
          <Toast toast={toast} />
        </Box>
        <TableContainer component={Paper} className={root}>
          <Table className={table} aria-label={`table`}>
            <MasterTableHead {...headerProps} />
            <TableBody>
              <MasterTableList data={orders} columns={columns} change={changeStatus} />
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
