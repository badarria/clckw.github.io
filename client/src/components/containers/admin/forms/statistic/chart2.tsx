import * as React from 'react'
import { Box, Paper } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { Chart2Res, Range, ChartDate } from '../../types'
import { PieSeries, Chart, Tooltip, Legend, Title } from '@devexpress/dx-react-chart-material-ui'
import { useStyles } from './styles'
import { DateRangePicker } from 'components/containers/admin/components'
import { findDiapazone } from 'services/utils/datetime-func'
import { getChart2 } from 'services/admin/statistic'
import { EventTracker } from '@devexpress/dx-react-chart'

const { initBegin, initFinish } = findDiapazone()

export default () => {
  const { container, radioBox, chartBox } = useStyles()
  const [data, setData] = useState<Chart2Res[]>([])
  const [range, setRange] = useState<Range>({ begin: initBegin, finish: initFinish })

  const getData = async () => {
    const list = await getChart2(range)
    if ('type' in list) return
    setData(() => list)
  }

  useEffect(() => {
    getData()
  }, [range])

  const getRange = ({ begin, finish }: ChartDate) => {
    setRange(() => ({ begin, finish }))
  }

  return (
    <Paper className={container}>
      <Box className={radioBox}>
        <DateRangePicker getRange={getRange} initBegin={initBegin} initFinish={initFinish} />
      </Box>
      <Box className={chartBox}>
        <Chart data={data}>
          <PieSeries valueField='total' argumentField='city' />
          <Title text='Total count of orders by cities' />
          <EventTracker />
          <Tooltip />
          <Legend />
        </Chart>
      </Box>
    </Paper>
  )
}
