import { getOrderToRate, setOrderRating } from './api'

export const setRating = async (data: { id: string; rating: number }) => {
  const { id } = data
  const res = await setOrderRating(data)
  if (res.msg === id) {
    let msg = 'Order successfully rated!'
    return { rated: true, msg }
  } else return { rated: false, msg: res.msg }
}

export const getOrder = async (data: string) => {
  const res = await getOrderToRate(data)
  if (Array.isArray(res) && !res.length) {
    const msg = 'Sorry, no order found with this ID, please try another'
    return { rated: true, msg }
  } else if (Array.isArray(res)) return res
  else return { rated: true, msg: res.msg }
}
