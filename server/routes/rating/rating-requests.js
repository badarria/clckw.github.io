const { jwtDecode } = require('../../utils/jwtGenerator')
const { Order, Customer } = require('../../db/models')

const getOrderToRate = async (req, res) => {
  const { orderId } = req.params
  const id = jwtDecode(orderId)
  const order = await Order.findAll({
    attributes: ['id', 'customer', 'rating'],
    where: { id },
    include: { model: Customer, as: 'c', attributes: ['name', 'surname', 'fullName'] },
  })
  return res.json(order)
}

const setOrderRating = async (req, res) => {
  const { orderId, rating } = req.body
  const result = await Order.update({ rating }, { where: { id: orderId }, returning: true })
  const msg = result[1][0]?.id
  return res.json({ msg })
}

module.exports = { getOrderToRate, setOrderRating }
