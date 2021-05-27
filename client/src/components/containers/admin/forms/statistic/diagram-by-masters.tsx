import * as React from 'react'
import { Box, Paper, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { DiagramByMastersRes, Range } from '../../types'
import { PieSeries, Chart, Tooltip, Legend } from '@devexpress/dx-react-chart-material-ui'
import { useStyles } from './styles'
import { DateRangePicker } from '../../components'
import { findDiapazone } from '../../../../../services/utils/datetime-func'
import { EventTracker } from '@devexpress/dx-react-chart'

const { initBegin, initFinish } = findDiapazone()
type Props = { data: DiagramByMastersRes[]; getData: (range: Range) => void }

export default ({ getData, data }: Props) => {
  const { container, radioBox, chartBox, title, noDataBox } = useStyles()
  const [range, setRange] = useState<Range>({ begin: initBegin, finish: initFinish })

  useEffect(() => {
    getData(range)
  }, [range])

  const getRange = ({ begin, finish }: Range) => {
    setRange(() => ({ begin, finish }))
  }
  return (
    <Paper className={container}>
      <Typography variant='h5' className={title} align='center'>
        Total count of orders by masters
      </Typography>
      <Box className={radioBox}>
        <DateRangePicker getRange={getRange} initBegin={initBegin} initFinish={initFinish} />
      </Box>
      <Box className={chartBox}>
        {data.length > 1 ? (
          <Chart data={data}>
            <PieSeries valueField='total' argumentField='master' />
            <EventTracker />
            <Tooltip />
            <Legend />
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
