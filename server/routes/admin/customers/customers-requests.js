const { Customer } = require('../../../db/models')

const update = async (req, res) => {
  const { name, surname, email, id } = req.body
  const result = await Customer.update({ name, surname, email }, { where: { id } })
  return res.json(result[0] ? 'Customer was updated' : 'Customer not found')
}

const getList = async (req, res) => {
  let { orderby, order, limit, offset } = req.params
  limit = limit === '-1' ? 'all' : limit

  const { rows, count } = await Customer.findAndCountAll({ order: [[orderby, order]], limit, offset })

  return res.json({ items: rows, count })
}

const remove = async (req, res) => {
  const { id } = req.params
  await Customer.destroy({ where: { id } })
  return res.json('Customer was deleted')
}

const add = async (req, res) => {
  const { name, surname, email } = req.body
  await Customer.create({ name, surname, email })

  return res.json('Customer was added')
}

module.exports = { add, remove, getList, update }
