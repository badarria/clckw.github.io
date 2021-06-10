import {
  Paper,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Table,
  Typography,
  Box,
} from '@material-ui/core'
import { TableByMastersList, Range } from '../../../types'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Chart4List } from './table-by-masters-list'
import { getTableByMastersInit } from '../../../../../../services/admin/statistic'
import { findDiapazone } from '../../../../../../services/utils/datetime-func'
import { Paging } from '../../../../../../types'
import { Chart4Head } from './table-by-masters-header'
import { useStyles } from '../styles'
import { Pagination } from '../../../components/table/pagination'
import { DateRangePicker } from '../../../components'

const { initBegin, initFinish } = findDiapazone()
type Props = {
  getData: (range: Range) => void
  data: TableByMastersList[]
  paging: Required<Paging>
  setChange: (data: Paging) => void
}

export default ({ data, paging, setChange, getData }: Props) => {
  const { root, table, head, container, title, noDataBox, rangeBox } = useStyles()
  const [range, setRange] = useState<Range>({ begin: initBegin, finish: initFinish })
  const [servicesKeys, setServiceKeys] = useState<string[]>([])
  const { order, orderby, offset, limit, count } = paging

  const getInitData = async () => {
    const data = await getTableByMastersInit()
    if ('type' in data) return

    const keys: string[] = []
    data.forEach(({ name }) => keys.push(name))
    setServiceKeys(keys)
  }

  const getRange = ({ begin, finish }: Range) => {
    setRange(() => ({ begin, finish }))
  }

  useEffect(() => {
    getInitData()
  }, [])

  useEffect(() => {
    getData(range)
  }, [range, paging])

  const headProps = { order, orderby, setChange, servicesKeys }
  const pagination = { option: { limit, offset, count }, setPaging: setChange }

  return (
    <>
      <Paper className={container}>
        <Typography variant='h5' className={title} align='center'>
          Statistics by masters
        </Typography>
        <Box className={rangeBox}>
          <DateRangePicker onChange={getRange} initBegin={initBegin} initFinish={initFinish} />
        </Box>
        {data.length ? (
          <TableContainer className={root}>
            <Table className={table} aria-label={`table`}>
              <TableHead className={head}>
                <Chart4Head {...headProps} />
              </TableHead>
              <TableBody>
                <Chart4List data={data} servicesKeys={servicesKeys} />
              </TableBody>
              <TableFooter>
                <TableRow>
                  <Pagination {...pagination} />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        ) : (
          <Box className={noDataBox}>
            <Typography>There is no data for this period</Typography>
          </Box>
        )}
      </Paper>
    </>
  )
}
