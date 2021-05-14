import {
  Chart1,
  Chart1Init,
  Chart1Res,
  ChartDate,
  Chart2Res,
  Chart3Res,
  Chart4Res,
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

const get1 = async ({ begin, finish, period }: Chart1): Promise<Chart1Res> => {
  const token = getToken()
  let path = ''
  if (period === 'day') path = 'chart1Days'
  if (period === 'week') path = 'chart1Weeks'
  if (period === 'month') path = 'chart1Months'
  const res = await fetch(`${adminPath}/${path}/'${begin}'/'${finish}'`, {
    headers: { token },
  })
  return res.json()
}

const get1Init = async (): Promise<Chart1Init> => {
  const token = getToken()
  const res = await fetch(`${adminPath}/chart1Init`, {
    headers: { token },
  })
  return res.json()
}

const get2 = async ({ begin, finish }: ChartDate): Promise<Chart2Res[]> => {
  const token = getToken()
  const res = await fetch(`${adminPath}/chart2/'${begin}'/'${finish}'`, {
    headers: { token },
  })
  return res.json()
}

const get3 = async ({ begin, finish }: ChartDate): Promise<Chart3Res[]> => {
  const token = getToken()
  const res = await fetch(`${adminPath}/chart3/'${begin}'/'${finish}'`, {
    headers: { token },
  })
  return res.json()
}

const get4 = async ({ begin, finish }: ChartDate): Promise<Chart4Res[]> => {
  const token = getToken()
  const res = await fetch(`${adminPath}/chart4/'${begin}'/'${finish}'`, {
    headers: { token },
  })
  return res.json()
}

export const getChart1 = async (data: Chart1) => await wrapTryCatch(get1(data))
export const getChart1Init = async () => await wrapTryCatch(get1Init())
export const getChart2 = async (data: ChartDate) => await wrapTryCatch(get2(data))
export const getChart3 = async (data: ChartDate) => await wrapTryCatch(get3(data))
export const getChart4 = async (data: ChartDate) => await wrapTryCatch(get4(data))
