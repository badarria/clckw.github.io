const { sequelize } = require('../../../db/db')
const { Order, Customer, Master, Service, City } = require('../../../db/models')
const { Op } = require('sequelize')

const update = async (req, res) => {
  const { master, customer, service, begin, finish, id } = req.body
  const result = await Order.update(
    { master_id: master, customer_id: customer, service_id: service, beginat: begin, finishat: finish },
    { where: { id } }
  )

  return res.json(result[0] ? 'Order was updated' : 'Order not found')
}

const getList = async (req, res) => {
  let { orderby, order, limit, offset } = req.params
  limit = limit === '-1' ? 'all' : limit

  let ord = [orderby, order]
  if (orderby === 'master') ord = [{ model: Master, as: 'm' }, 'name', order]
  if (orderby === 'customer') ord = [{ model: Customer, as: 'c' }, 'name', order]
  if (orderby === 'city') ord = [{ model: Master, as: 'm' }, { model: City, as: 'ci' }, 'name', order]
  if (orderby === 'service') ord = [{ model: Service, as: 's' }, 'name', order]
  if (orderby === 'date' || orderby === 'begin') ord = ['beginat', order]
  if (orderby === 'finish') ord = ['finishat', order]

  let { rows, count } = await Order.scope('allIncl').findAndCountAll({
    order: [ord],
    limit,
    offset,
  })

  return res.json({ items: rows, count })
}

const getFiltered = async (req, res) => {
  const { master_id, date, order_id } = req.params

  const filteredOrders = await Order.findAll({
    attributes: ['finishat', 'beginat', 'finish', 'begin'],

    where: {
      [Op.and]: sequelize.where(sequelize.cast(sequelize.col('beginat'), 'date'), date),
      master_id,
      id: { [Op.not]: order_id },
    },
  })

  return res.json(filteredOrders)
}

const getKeys = async (req, res) => {
  const master = await Master.findAll()
  const customer = await Customer.findAll()
  const service = await Service.findAll()

  return res.json({ master, customer, service })
}

const remove = async (req, res) => {
  const { id } = req.params
  await Order.destroy({ where: { id } })
  return res.json('Order was deleted')
}

const add = async (req, res) => {
  const { master, customer, service, begin, finish } = req.body
  await Order.create({ master_id: master, customer_id: customer, service_id: service, beginat: begin, finishat: finish })
  return res.json('Order was added')
}

module.exports = { remove, add, getKeys, getFiltered, getList, update }
