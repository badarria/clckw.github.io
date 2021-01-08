const pool = require('../../../db')

const update = async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  await pool.none(
    `UPDATE cities
           SET name = $1
           WHERE id = $2`,
    [name, id]
  )
  return res.json('City was updated')
}

const getList = async (req, res) => {
  let { limit, order, offset, orderby } = req.params
  limit = limit === '-1' ? 'all' : limit

  const list = await pool.any(
    `SELECT json_agg(ci) as item FROM
          (SELECT * FROM cities
          order by $1:raw $2:raw
          limit $3:raw
          offset $4) ci
          UNION ALL
          SELECT json_agg(ci) FROM
          (SELECT count(*) FROM cities) ci`,
    [orderby, order, limit, offset]
  )
  const data = { items: list[0].item, count: list[1].item[0].count }
  return res.json(data)
}

const remove = async (req, res) => {
  const { id } = req.params
  await pool.none(`DELETE FROM cities WHERE id = $1`, id)
  return res.json('City was deleted')
}

const add = async (req, res) => {
  const { name } = req.body
  await pool.none(`INSERT INTO cities (name) VALUES($1)`, name)
  return res.json('City was added')
}

module.exports = { add, remove, getList, update }
