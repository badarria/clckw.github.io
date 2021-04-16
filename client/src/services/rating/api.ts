import { Response } from '../../types'
const ratingPath = '/rating'

type OrderRes = { id: number; customer: string; rating: number }

const wrapTryCatch = async <T>(tryFunc: T) => {
  try {
    return await tryFunc
  } catch {
    return <Response>{ type: 'error', msg: 'Something went wrong' }
  }
}

const setRating = async (data: { id: number; rating: number }): Promise<{ msg: string }> => {
  const res = await fetch(`${ratingPath}/setRating`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const getOrder = async (id: number): Promise<[OrderRes]> => {
  const res = await fetch(`${ratingPath}/getOrder/${id}`)
  return res.json()
}

export const setOrderRating = async (data: { id: number; rating: number }) => wrapTryCatch(setRating(data))
export const getOrderToRate = async (data: number) => wrapTryCatch(getOrder(data))
