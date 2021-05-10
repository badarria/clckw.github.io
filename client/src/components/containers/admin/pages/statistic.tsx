import React, { useEffect, useState } from 'react'
import { Loader } from '../components'
import { Response } from '../../../../types'
import { useStyles } from './styles'
import { Container } from '@material-ui/core'
import Chart1 from '../forms/statistic/chart1'

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
    </Container>
  )
}
