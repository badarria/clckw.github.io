import { Container, Box, Paper, TableBody, Table, TableContainer, TableFooter } from '@material-ui/core'
import { Loader, Toast } from 'components/ui'
import React, { useCallback, useEffect, useState } from 'react'
import { Paging, Response } from 'types'
import { Pagination, MasterTableHead, MasterTableList } from './components'
import { useStyles } from './styles'
import { getList, sendRatingMail, setDone, getOrdersPhoto, getOrdersReceipt } from '../../../services/master'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { useHistory } from 'react-router-dom'
import { ChangeStatus, Columns, List } from './types'

const columns: Columns = [
  'id',
  'customer',
  'service',
  'price',
  'date',
  'begin',
  'finish',
  'rating',
  'completed',
  'photos',
  'receipt',
]

export const Master = () => {
  const user = useSelector((state: RootState) => state.user)
  const [orders, setOrders] = useState<List[]>([])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<Response>({ type: 'success', msg: '' })
  const initPaging: Required<Paging> = {
    limit: 10,
    offset: 0,
    order: 'desc',
    orderby: 'date',
    count: orders.length,
  }
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
    else if (!orders.list.length) {
      const toast: Response = {
        type: 'warning',
        msg: `Hi, ${user.name}, you haven't orders`,
      }
      setToastMsg(toast)
    } else {
      const { count, list } = orders
      setOrders(list)

      const toast: Response = {
        type: 'success',
        msg: `Hi, ${user.name}, you have ${count} orders. `,
      }
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

  const changeStatus = async (data: ChangeStatus) => {
    const result = await setLoader(setDone(data.id))
    setToastMsg(result)
    if (result.type !== 'error') {
      getOrdersList()
      sendRatingMail(data)
    }
  }

  const getPdf = useCallback(async (id: number) => {
    const pdf = await setLoader(getOrdersReceipt(id))
    if (pdf instanceof Blob) {
      const url = URL.createObjectURL(pdf)
      const a = document.createElement('a')
      a.href = url
      a.download = 'receipt.pdf'
      a.click()
    } else setToastMsg(pdf)
  }, [])

  const headerProps = { columns, order, orderby, setChange }
  const paginatorProps = {
    option: { limit, offset, count },
    setPaging: setChange,
  }

  const masterListProps = {
    data: orders,
    columns,
    change: changeStatus,
    getZip: getOrdersPhoto,
    getPdf,
  }

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
              <MasterTableList {...masterListProps} />
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
