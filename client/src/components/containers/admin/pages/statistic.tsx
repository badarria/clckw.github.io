import React, { useState } from 'react'
import { Loader, Toast } from '../components'
import { Paging, Response } from '../../../../types'
import { useStyles } from './styles'
import { Box, Container } from '@material-ui/core'
import Chart1 from '../forms/statistic/chart1/chart1'
import Chart2 from '../forms/statistic/chart2'
import Chart3 from '../forms/statistic/chart3'
import Chart4 from '../forms/statistic/chart4/chart4'
import { Chart1Res, Chart2Res, Period, Range, Chart3Res, Chart4ResList } from '../types'
import { getChart1, getChart2, getChart3, getChart4 } from 'services/admin/statistic'

const initPaging: Required<Paging> = { offset: 0, limit: 5, orderby: 'master', order: 'desc', count: 0 }

export default () => {
  const [toast, setToast] = useState<Response>({ type: 'success', msg: '' })
  const [loading, setLoading] = useState(false)
  const [chart1, setChart1] = useState<Chart1Res>([])
  const [chart2, setChart2] = useState<Chart2Res[]>([])
  const [chart3, setChart3] = useState<Chart3Res[]>([])
  const [chart4, setChart4] = useState<Chart4ResList[]>([])
  const [chart4Paging, setChart4Paging] = useState<Required<Paging>>(initPaging)

  const { container, halfBox, diagramsBox, totalBox, box } = useStyles()

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

  const getChart1Data = async (range: Range, period: Period) => {
    const list = await setLoader(getChart1({ ...range, period }))
    if ('type' in list) return setToastMsg(list)
    setChart1(() => list)
  }

  const getChart2Data = async (range: Range) => {
    const list = await setLoader(getChart2(range))
    if ('type' in list) return setToastMsg(list)
    setChart2(() => list)
  }

  const getChart3Data = async (range: Range) => {
    const list = await setLoader(getChart3(range))
    if ('type' in list) return

    const getTop = () => {
      list.sort((a, b) => b.total - a.total)
      const other = list.slice(3).reduce((acc, { total }) => {
        acc += total
        return acc
      }, 0)

      return [...list.slice(0, 3), { master: 'Other', total: other }]
    }
    setChart3(() => getTop())
  }

  const getChart4Data = async (range: Range) => {
    const res = await getChart4({ ...range, paging: chart4Paging })
    if ('type' in res) return

    const { list, count } = res
    if (chart4Paging.count !== count) setChart4Paging((prev) => ({ ...prev, count }))
    setChart4(list)
  }

  const setChange = async (data: Paging) => setChart4Paging((paging) => ({ ...paging, ...data }))

  const chart1Props = { getData: getChart1Data, data: chart1 }
  const chart2Props = { getData: getChart2Data, data: chart2 }
  const chart3Props = { getData: getChart3Data, data: chart3 }
  const chart4Props = { getData: getChart4Data, data: chart4, paging: chart4Paging, setChange }

  return (
    <Container className={container}>
      <Box className={box}>
        <Toast toast={toast} />
      </Box>
      <Loader loading={loading} />
      <Box className={totalBox}>
        <Chart1 {...chart1Props} />
      </Box>
      <Box className={diagramsBox}>
        <Box className={halfBox}>
          <Chart2 {...chart2Props} />
        </Box>
        <Box className={halfBox}>
          <Chart3 {...chart3Props} />
        </Box>
      </Box>
      <Box className={totalBox}>
        <Chart4 {...chart4Props} />
      </Box>
    </Container>
  )
}
