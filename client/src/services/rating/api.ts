import { TypicalResponse } from 'types'

const ratingPath = '/rating'

const wrapTryCatch = async <T>(tryFunc: T) => {
  try {
    return await tryFunc
  } catch {
    return { type: 'error', msg: 'Something went wrong' } as TypicalResponse
  }
}

const setRating = async (data: { orderId: string; rating: number }): Promise<{ msg: string }> => {
  const res = await fetch(`${ratingPath}/setRating`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const getOrder = async (orderId: string): Promise<{ id: number; customer: string; rating: number }[]> => {
  console.log(orderId, 'api')
  const res = await fetch(`${ratingPath}/getOrder/${orderId}`)
  return res.json()
}

export const setOrderRating = async (data: { orderId: string; rating: number }) => wrapTryCatch(setRating(data))
export const getOrderToRate = async (data: string) => wrapTryCatch(getOrder(data))
