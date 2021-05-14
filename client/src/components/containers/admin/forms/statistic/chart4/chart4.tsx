import { Paper, TableBody, TableContainer, TableFooter, TableHead, TableRow, Table } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { Chart4Res, Period, Range } from 'components/containers/admin/types'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Chart4List } from './chart4-list'
import { getChart4 } from 'services/admin/statistic'
import { findDiapazone } from 'services/utils/datetime-func'
import { Paging } from 'types'
import { Chart4Head } from './chart4-header'
import { useStyles } from './styles'

const initPeriod: Period = 'day'
const { initBegin, initFinish } = findDiapazone()
const initPaging: Required<Paging> = { offset: 0, limit: 10, orderby: 'master', order: 'desc', count: 10 }

export default () => {
  const { root, table, head } = useStyles()
  const [data, setData] = useState<Chart4Res[]>([])
  const [range, setRange] = useState<Range>({ begin: initBegin, finish: initFinish })
  const [period, setPeriod] = useState<Period>(initPeriod)
  const [paging, setPaging] = useState<Required<Paging>>(initPaging)
  const { order, orderby, offset, limit, count } = paging

  const getData = async () => {
    const list = await getChart4(range)
    if ('type' in list) return

    setData(list)
  }

  useEffect(() => {
    getData()
  }, [range])

  const setChange = async (data: Paging) => {
    setPaging((paging) => ({ ...paging, ...data }))
  }

  const headProps = { order, orderby, setChange, types: ['small size', 'middle size', 'big size'] }
  const pagination = { limit, offset, count, setChange }

  return (
    <TableContainer component={Paper} className={root}>
      <Table className={table} aria-label={`table`}>
        <TableHead className={head}>
          <Chart4Head {...headProps} />
        </TableHead>
        <TableBody>
          <Chart4List data={data} />
        </TableBody>
        <TableFooter>
          <TableRow>
            <Pagination {...pagination} />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
