import React, { useState } from 'react'
import { Loader } from '../components'
import { Response } from '../../../../types'
import { useStyles } from './styles'
import { Container } from '@material-ui/core'
import Chart1 from '../forms/statistic/chart1/chart1'
import Chart2 from '../forms/statistic/chart2'
import Chart3 from '../forms/statistic/chart3'
import Chart4 from '../forms/statistic/chart4/chart4'

export default () => {
  const [toast, setToast] = useState<Response>({ type: 'success', msg: '' })
  const [loading, setLoading] = useState(false)
  const { container } = useStyles()

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

  return (
    <Container className={container}>
      <Loader loading={loading} />
      <Chart1 />
      <Chart2 />
      <Chart3 />
      <Chart4 />
    </Container>
  )
}
