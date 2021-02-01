const ratingPath = '/rating'

const wrapTryCatch = async (tryFunc) => {
  try {
    return await tryFunc
  } catch {
    return { type: 'error', msg: 'Something went wrong' }
  }
}

const setRating = async (data) => {
  const res = await fetch(`${ratingPath}/setRating`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const getOrder = async (orderId) => {
  console.log(orderId, 'api')
  const res = await fetch(`${ratingPath}/getOrder/${orderId}`)
  return res.json()
}

export const setOrderRating = async (data) => wrapTryCatch(setRating(data))
export const getOrderToRate = async (data) => wrapTryCatch(getOrder(data))
