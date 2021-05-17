import {
  Histogram,
  HistogramInit,
  HistogramRes,
  ChartDate,
  DiagramByCitiesRes,
  DiagramByMastersRes,
  TableByMastersRes,
  TableByMasters,
  TableByMastersInit,
} from '../../../components/containers/admin/types'
import { Response } from '../../../types'

const adminPath = '/admin/statistic'
const getToken = () => localStorage.getItem('token') || ''

const wrapTryCatch = async <T>(tryFunc: T) => {
  try {
    return await tryFunc
  } catch {
    return <Response>{ type: 'error', msg: 'Something went wrong' }
  }
}

const get1 = async ({ begin, finish, period }: Histogram): Promise<HistogramRes> => {
  const token = getToken()
  let path = ''
  if (period === 'day') path = 'histogramDays'
  if (period === 'week') path = 'histogramWeeks'
  if (period === 'month') path = 'histogramMonths'
  const res = await fetch(`${adminPath}/${path}/'${begin}'/'${finish}'`, {
    headers: { token },
  })
  return res.json()
}

const getHistInit = async (): Promise<HistogramInit> => {
  const token = getToken()
  const res = await fetch(`${adminPath}/histogramInit`, {
    headers: { token },
  })
  return res.json()
}

const getDiagramCities = async ({ begin, finish }: ChartDate): Promise<DiagramByCitiesRes[]> => {
  const token = getToken()
  const res = await fetch(`${adminPath}/citiesDiagram/'${begin}'/'${finish}'`, {
    headers: { token },
  })
  return res.json()
}

const getDiagramMasters = async ({ begin, finish }: ChartDate): Promise<DiagramByMastersRes[]> => {
  const token = getToken()
  const res = await fetch(`${adminPath}/mastersDiagram/'${begin}'/'${finish}'`, {
    headers: { token },
  })
  return res.json()
}

const getTable = async (data: TableByMasters): Promise<TableByMastersRes> => {
  const token = getToken()
  const {
    begin,
    finish,
    paging: { limit, offset, orderby, order },
  } = data
  const res = await fetch(`${adminPath}/tableByMasters/'${begin}'/'${finish}'/${limit}/${offset}/${orderby}/${order}`, {
    headers: { token },
  })
  return res.json()
}

const getTableInit = async (): Promise<TableByMastersInit> => {
  const token = getToken()
  const res = await fetch(`${adminPath}/tableByMastersInit`, {
    headers: { token },
  })
  return res.json()
}

export const getHistogram = async (data: Histogram) => await wrapTryCatch(get1(data))
export const getHistogramInit = async () => await wrapTryCatch(getHistInit())
export const getDiagramByCities = async (data: ChartDate) => await wrapTryCatch(getDiagramCities(data))
export const getDiagramByMasters = async (data: ChartDate) => await wrapTryCatch(getDiagramMasters(data))
export const getTableByMasters = async (data: TableByMasters) => await wrapTryCatch(getTable(data))
export const getTableByMastersInit = async () => await wrapTryCatch(getTableInit())
