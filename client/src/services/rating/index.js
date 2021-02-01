import { getOrderToRate, setOrderRating } from './api'

export const setRating = async (data) => {
  const { orderId } = data
  const res = await setOrderRating(data)
  if (res === orderId) {
    let msg = 'Order successfully rated!'
    return { rated: true, msg }
  } else return { rated: false, msg: res.msg }
}

export const getOrder = async (data) => {
  const res = await getOrderToRate(data)
  if (res.length) return res
  else if (Array.isArray(res) && !res.length) {
    const msg = 'Sorry, no order found with this ID, please try another'
    return { rated: true, msg }
  } else return { rated: true, msg: res.msg }
}
