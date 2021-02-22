const { Master, City, Order } = require('../../../db/models')

const getKeys = async (req, res) => {
  const city = await City.findAll()
  return res.json({ city })
}

const update = async (req, res) => {
  const { name, surname, city, id } = req.body
  const result = await Master.update(
    { name, surname, city_id: city },
    {
      where: { id },
      returning: true,
    }
  )

  return res.json(result[0] ? 'Master was updated' : 'Master not found')
}

const getList = async (req, res) => {
  let { limit, offset, orderby, order } = req.params
  limit = limit === '-1' ? 'all' : limit
  let ord = [orderby, order]
  if (orderby === 'city') {
    ord = [{ model: City, as: 'ci' }, 'name', order]
  }
  if (orderby === 'rating') ord = ['id', order]

  const count = await Master.count()
  const items = await Master.findAll({
    attributes: ['id', 'name', 'surname', 'city', 'rating', 'city_id'],
    order: [ord],
    limit,
    offset,
    include: [
      {
        model: City,
        as: 'ci',
        attributes: ['name', 'id'],
      },
      {
        model: Order,
        as: 'o',
        attributes: ['rating'],
      },
    ],
  })

  return res.json({ items, count })
}

const remove = async (req, res) => {
  const { id } = req.params
  await Master.destroy({ where: { id } })

  return res.json('Master was deleted')
}

const add = async (req, res) => {
  const { name, surname, city } = req.body
  await Master.create({ name, surname, city_id: city })
  return res.json('Master was added')
}

module.exports = { update, add, remove, getList, getKeys }
