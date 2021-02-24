const { City } = require('../../../db/models')

const update = async (req, res) => {
  const { name, id } = req.body
  const result = await City.update({ name }, { where: { id } })
  const msg = result[0] ? 'City was updated' : 'City not found'
  return res.json({ type: 'success', msg })
}

const getList = async (req, res) => {
  let { limit, order, offset, orderby } = req.params
  limit = limit === '-1' ? 'all' : limit
  const { rows, count } = await City.findAndCountAll({ order: [[orderby, order]], limit, offset })

  return res.json({ items: rows, count })
}

const remove = async (req, res) => {
  const { id } = req.params
  await City.destroy({ where: { id } })

  return res.json({ type: 'success', msg: 'City was deleted' })
}

const add = async (req, res) => {
  const { name } = req.body
  await City.create({ name })

  return res.json({ type: 'success', msg: 'City was added' })
}

module.exports = { add, remove, getList, update }
