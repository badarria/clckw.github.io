import { Container, Box, Paper, TableBody, Table, TableContainer, TableFooter } from '@material-ui/core'
import { Loader, Toast } from 'components/ui'
import React, { useEffect, useState } from 'react'
import { DataForRatingRequest, MasterOrdersList, Paging, TypicalResponse } from 'types'
import { Pagination, MasterTableHead, MasterTableList } from './components'
import { useStyles } from './styles'
import { getList, sendRatingMail, setDone } from '../../../services/master'

export const Master = ({ id, name }: { id: number; name: string }) => {
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
  const columns = ['id', 'customer', 'service', 'date', 'begin', 'finish', 'rating', 'completed']
  const [orders, setOrders] = useState([initOrder])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<TypicalResponse>({ type: 'success', msg: '' })
  const initPaging: Paging = { limit: 10, offset: 0, order: 'desc', orderby: 'date', count: orders.length }
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

  const getOrdersList = async (sayHi = false) => {
    const list = await setLoader(getList({ ...paging, id }))
    if ('type' in list) setToastMsg(list)
    else if (!list.length) {
      const toast: TypicalResponse = { type: 'warning', msg: `Hi, ${name}, you haven't orders` }
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
      const toast: TypicalResponse = { type: 'success', msg: `Hi, ${name}, you have ${data.length} orders. ` }
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

  const changeStatus = async (data: DataForRatingRequest) => {
    const result = await setLoader(setDone(data.id))
    setToastMsg(result)
    if (result.type !== 'error') {
      getOrdersList()
      const ratingRequest = await sendRatingMail(data)
      console.log(ratingRequest)
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
