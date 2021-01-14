const pool = require('../../db')
const { jwtDecode } = require('../../utils/jwtGenerator')

const getOrderToRate = async (req, res) => {
  const { orderId } = req.params
  const id = jwtDecode(orderId)
  const order = await pool.any(
    `SELECT o.id, 
           c.name || ' ' || c.surname as customer,
           coalesce(o.rating, null) as rating
           FROM orders o
           LEFT JOIN customers c ON o.customer = c.id
           WHERE o.id=$1`,
    id
  )
  return res.json(order)
}

const setOrderRating = async (req, res) => {
  const { orderId, rating } = req.body
  const result = await pool.any(
    `UPDATE orders SET rating=$1
           WHERE id=$2 RETURNING id`,
    [rating, orderId]
  )

  return res.json(result[0]?.id || null)
}

module.exports = { getOrderToRate, setOrderRating }
