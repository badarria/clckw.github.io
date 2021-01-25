const ratingPath = '/rating'

const _wrapTryCatch = async (tryFunc) => {
  try {
    return await tryFunc
  } catch {
    return { type: 'error', msg: 'Something went wrong' }
  }
}

const _setRating = async (data) => {
  const res = await fetch(`${ratingPath}/setRating`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

const _getOrderToRate = async ({ orderId }) => {
  const res = await fetch(`${ratingPath}/getOrder/${orderId}`)
  return res.json()
}

export const setOrderRating = async (data) => _wrapTryCatch(_setRating(data))
export const getOrderToRate = async (data) => _wrapTryCatch(_getOrderToRate(data))
