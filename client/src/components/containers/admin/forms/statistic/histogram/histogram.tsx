import * as React from 'react'
import { Box, Paper, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { HistogramRes, Period, Range } from '../../../types'
import { ArgumentAxis, ValueAxis, Chart, BarSeries } from '@devexpress/dx-react-chart-material-ui'
import { useStyles } from '../styles'
import { DateRangePicker } from '../../../components'
import { findDiapazone } from '../../../../../../services/utils/datetime-func'
import { HistogramSelect } from './histogram-select'
import { HistogramLabel } from './histogram-label'

const initPeriod: Period = 'day'
const { initBegin, initFinish } = findDiapazone()
type FilteredData = { day?: string; month?: number; week?: number; total: number }
type Props = { getData: (range: Range, period: Period) => void; data: HistogramRes }

export default ({ getData, data }: Props) => {
  const { container, title, radioBox, chartBox, noDataBox } = useStyles()
  const [filteredData, setFilteredData] = useState<FilteredData[]>([])
  const [range, setRange] = useState<Range>({ begin: initBegin, finish: initFinish })
  const [period, setPeriod] = useState<Period>(initPeriod)
  const [masters, setMasters] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])

  const getFilteredData = () => {
    if (!masters.length && !cities.length) {
      const newData = data.map((item) => {
        return { [period]: item[period], total: item.total }
      })
      return setFilteredData(newData)
    }

    const keys = masters.length ? masters : cities
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
    getFilteredData()
  }, [data, masters, cities])

  useEffect(() => {
    getData(range, period)
  }, [range])

  const getRange = ({ begin, finish, period }: { begin: string; finish: string; period: Period }) => {
    setPeriod(period)
    setRange(() => ({ begin, finish }))
  }
  const selectProps = { setMasters, setCities, masters, cities, data }

  return (
    <Paper className={container}>
      <Typography variant='h5' className={title} align='center'>
        Total count of orders
      </Typography>

      <Box className={radioBox}>
        <DateRangePicker getRange={getRange} initBegin={initBegin} initFinish={initFinish} />
        <HistogramSelect {...selectProps} />
      </Box>
      <Box className={chartBox}>
        {data.length ? (
          <Chart data={filteredData}>
            <ArgumentAxis labelComponent={HistogramLabel(period)} />
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
