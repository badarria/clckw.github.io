const { Service } = require('../../../db/models')

const update = async (req, res) => {
  const { name, time, id } = req.body
  const result = await Service.update({ name, time }, { where: { id } })

  return res.json(result[0] ? 'Service was updated' : 'Service not found')
}

const getList = async (req, res) => {
  let { orderby, order, limit, offset } = req.params
  limit = limit === '-1' ? 'all' : limit
  const { rows, count } = await Service.findAndCountAll({ order: [[orderby, order]], limit, offset })

  return res.json({ items: rows, count })
}

const remove = async (req, res) => {
  const { id } = req.params
  await Service.destroy({ where: { id } })
  return res.json(`Service was deleted`)
}

const add = async (req, res) => {
  const { name, time } = req.body
  await Service.create({ name, time })
  return res.json('Service was added')
}

module.exports = { add, remove, getList, update }
