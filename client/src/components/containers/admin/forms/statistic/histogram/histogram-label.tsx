import * as React from 'react'
import { ArgumentAxis } from '@devexpress/dx-react-chart-material-ui'
import { DateTime } from 'luxon'
import { Period } from '../../../types'

const getWeekDates = (weekNumber: number) => {
  if (`${weekNumber}`.match(/(\d\d.[1-9])/)) return null
  const dt = DateTime.fromObject({ weekYear: 2017, weekNumber })
  const begin = dt.startOf('week').toFormat('dd.MM')
  const finish = dt.endOf('week').toFormat('dd.MM')
  return `${begin} - ${finish}`
}
const getDays = (str: string) => str.replace(/(\d{4}-)/, '').replace(/(-)+/, '.')

const getMonths = (month: number) => {
  if (`${month}`.match(/(\d{1,2}.[1-9])/)) return null
  return DateTime.fromObject({ month }).toFormat('LLLL')
}

export const HistogramLabel = (period: Period) => (data: ArgumentAxis.LabelProps) => {
  let text = getDays(`${data.text}`)
  if (period === 'week') text = getWeekDates(Number(data.text)) || ''
  if (period === 'month') text = getMonths(Number(data.text)) || ''

  return (
    <text x={data.x} y={data.y} dy={data.dy} text-anchor={data.textAnchor}>
      {text}
    </text>
  )
}
