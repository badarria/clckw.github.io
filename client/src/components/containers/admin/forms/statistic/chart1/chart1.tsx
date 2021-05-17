import * as React from 'react'
import { Box, Paper, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Chart1Res, Period, Range } from '../../../types'
import { ArgumentAxis, ValueAxis, Chart, BarSeries } from '@devexpress/dx-react-chart-material-ui'
import { useStyles } from '../styles'
import { DateRangePicker } from 'components/containers/admin/components'
import { findDiapazone } from 'services/utils/datetime-func'
import { MultipleSelect } from './select'
import { Label } from './label'

const initPeriod: Period = 'day'
const { initBegin, initFinish } = findDiapazone()
type FilteredData = { day?: string; month?: number; week?: number; total: number }
type Props = { getData: (range: Range, period: Period) => void; data: Chart1Res }

export default ({ getData, data }: Props) => {
  const { container, title, radioBox, chartBox, noDataBox } = useStyles()
  const [filteredData, setFilteredData] = useState<FilteredData[]>([])
  const [range, setRange] = useState<Range>({ begin: initBegin, finish: initFinish })
  const [period, setPeriod] = useState<Period>(initPeriod)

  const getFilteredData = (keys: string[]) => {
    if (!keys.length) {
      const newData = data.map((item) => {
        return { [period]: item[period], total: item.total }
      })
      return setFilteredData(newData)
    }

    const newData = data.reduce((acc: FilteredData[], item) => {
      const { orders } = item
      const newTotal = orders.reduce((accTotal, { city, master, count }) => {
        if (keys.includes(city) || keys.includes(master)) accTotal += count
        return accTotal
      }, 0)
      if (newTotal) {
        acc.push({ [period]: item[period], total: newTotal })
      }
      return acc
    }, [])
    return setFilteredData(newData)
  }

  useEffect(() => {
    getFilteredData([])
  }, [data])

  useEffect(() => {
    getData(range, period)
  }, [range])

  const getRange = ({ begin, finish, period }: { begin: string; finish: string; period: Period }) => {
    setPeriod(period)
    setRange(() => ({ begin, finish }))
  }

  return (
    <Paper className={container}>
      <Typography variant='h5' className={title} align='center'>
        Total count of orders
      </Typography>

      <Box className={radioBox}>
        <DateRangePicker getRange={getRange} initBegin={initBegin} initFinish={initFinish} />
        <MultipleSelect getFilteredData={getFilteredData} />
      </Box>
      <Box className={chartBox}>
        {data.length ? (
          <Chart data={filteredData}>
            <ArgumentAxis labelComponent={Label(period)} />
            <ValueAxis />
            <BarSeries valueField='total' argumentField={period} />
          </Chart>
        ) : (
          <Box className={noDataBox}>
            <Typography>There is no data for this period</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  )
}
