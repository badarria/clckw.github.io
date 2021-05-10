import { Chart1, Chart1Res } from '../../../components/containers/admin/types'
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


const get1Days = async ({ begin, finish }: Chart1): Promise<Chart1Res> => {
  const token = getToken()
  const res = await fetch(`${adminPath}/chart1Days/'${begin}'/'${finish}'`, {
    headers: { token },
  })
  return res.json()
}

export const getChart1Days = async (data: Chart1) => await wrapTryCatch(get1Days(data))

