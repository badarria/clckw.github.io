import * as React from 'react'
import { Paper, Typography } from '@material-ui/core'
import { ArgumentAxis, ValueAxis, Chart, BarSeries, ZoomAndPan } from '@devexpress/dx-react-chart-material-ui'
import { useStyles } from './styles'
import { Viewport } from '@devexpress/dx-react-chart'
import { useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { Chart1, Chart1Res } from '../../types'
import { getChart1Days } from '../../../../../services/admin/statistic'
import { Response } from '../../../../../types'

const generateData = (n: number) => {
  const ret = []
  let y = 0
  for (let i = 0; i < 100; i += 1) {
    y += Math.round(Math.random() * 10 - 5)
    ret.push({ x: i, y })
  }
  return ret
}
const initData = generateData(100)

type Period = 'year' | 'month' | 'week'
const findDiapazone = (period: Period) => {
  const begin = DateTime.now().startOf(period).toISO()
  const finish = DateTime.now().endOf(period).toISO()
  return { begin, finish }
}
const formatToArgs = (date: string) => DateTime.fromISO(date).toFormat('EEE dd.MM')

export default () => {
  const { container, title } = useStyles()
  const [currentData, setCurrentData] = useState<Chart1Res>([])
  const [viewport, setViewport] = useState<Viewport>({})
  const [data, setData] = useState<Chart1Res>([])

  const viewportChange = (viewport: Viewport) => {
    console.log(viewport)
    const { argumentStart, argumentEnd } = viewport

    setViewport(viewport)
  }

  const getData = async (data: Chart1) => {
    const list = await getChart1Days(data)
    if ('type' in list) return
    console.log(list)
    setData(list)
  }

  useEffect(() => {
    const data = findDiapazone('year')
    getData(data)
  }, [])

  return (
    <Paper className={container}>
      <Typography variant='h5' className={title} align='center'>
        Chart1
      </Typography>
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis />

        <BarSeries valueField='total' argumentField='day' />
        <ZoomAndPan viewport={viewport} onViewportChange={viewportChange} />
      </Chart>
    </Paper>
  )
}
