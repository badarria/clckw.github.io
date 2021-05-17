import React, { useState } from 'react'
import { Loader, Toast } from '../components'
import { Paging, Response } from '../../../../types'
import { useStyles } from './styles'
import { Box, Container } from '@material-ui/core'
import { HistogramRes, DiagramByCitiesRes, Period, Range, DiagramByMastersRes, TableByMastersList } from '../types'
import { getHistogram, getDiagramByCities, getDiagramByMasters, getTableByMasters } from 'services/admin/statistic'
import { DiagramByCities, DiagramByMasters, Histogram, TableByMasters } from '../forms'

const initPaging: Required<Paging> = { offset: 0, limit: 5, orderby: 'master', order: 'desc', count: 0 }

export default () => {
  const [toast, setToast] = useState<Response>({ type: 'success', msg: '' })
  const [loading, setLoading] = useState(false)
  const [histogram, setHistogram] = useState<HistogramRes>([])
  const [diagramByCities, setDiagramByCities] = useState<DiagramByCitiesRes[]>([])
  const [diagramByMasters, setDiagramByMasters] = useState<DiagramByMastersRes[]>([])
  const [tableByMasters, setTableByMasters] = useState<TableByMastersList[]>([])
  const [tableByMastersPaging, setChart4Paging] = useState<Required<Paging>>(initPaging)

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
    const list = await setLoader(getHistogram({ ...range, period }))
    if ('type' in list) return setToastMsg(list)
    setHistogram(() => list)
  }

  const getChart2Data = async (range: Range) => {
    const list = await setLoader(getDiagramByCities(range))
    if ('type' in list) return setToastMsg(list)
    setDiagramByCities(() => list)
  }

  const getChart3Data = async (range: Range) => {
    const list = await setLoader(getDiagramByMasters(range))
    if ('type' in list) return

    const getTop = () => {
      list.sort((a, b) => b.total - a.total)
      const other = list.slice(3).reduce((acc, { total }) => {
        acc += total
        return acc
      }, 0)

      return [...list.slice(0, 3), { master: 'Other', total: other }]
    }
    setDiagramByMasters(() => getTop())
  }

  const getChart4Data = async (range: Range) => {
    const res = await getTableByMasters({ ...range, paging: tableByMastersPaging })
    if ('type' in res) return

    const { list, count } = res
    if (tableByMastersPaging.count !== count) setChart4Paging((prev) => ({ ...prev, count }))
    setTableByMasters(list)
  }

  const setChange = async (data: Paging) => setChart4Paging((paging) => ({ ...paging, ...data }))

  const histogramProps = { getData: getChart1Data, data: histogram }
  const diagramCitiesProps = { getData: getChart2Data, data: diagramByCities }
  const diagramMastersProps = { getData: getChart3Data, data: diagramByMasters }
  const tableProps = { getData: getChart4Data, data: tableByMasters, paging: tableByMastersPaging, setChange }

  return (
    <Container className={container}>
      <Box className={box}>
        <Toast toast={toast} />
      </Box>
      <Loader loading={loading} />
      <Box className={totalBox}>
        <Histogram {...histogramProps} />
      </Box>
      <Box className={diagramsBox}>
        <Box className={halfBox}>
          <DiagramByCities {...diagramCitiesProps} />
        </Box>
        <Box className={halfBox}>
          <DiagramByMasters {...diagramMastersProps} />
        </Box>
      </Box>
      <Box className={totalBox}>
        <TableByMasters {...tableProps} />
      </Box>
    </Container>
  )
}
