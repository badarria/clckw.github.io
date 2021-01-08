const pool = require('../../../db')

const getKeys = async (req, res) => {
  const city = await pool.query('SELECT * FROM cities')
  return res.json({ city })
}

const update = async (req, res) => {
  const { name, surname, city, id } = req.body
  await pool.none(
    `UPDATE masters
     SET name = $1, surname = $2, city = $3
     WHERE id = $4`,
    [name, surname, city, id]
  )
  return res.json('Master was updated')
}

const getList = async (req, res) => {
  let { limit, offset, orderby, order } = req.params
  limit = limit === '-1' ? 'all' : limit

  const list = await pool.any(
    `SELECT json_agg(m) as item FROM
            (SELECT m.id, m.name, m.surname,
             ci.name as city,
             m.city as city_id,
             COALESCE(round(avg(o.rating)::numeric), 5) as rating
             FROM masters m LEFT JOIN orders o ON m.id=o.master
             LEFT JOIN cities ci ON m.city = ci.id
             GROUP BY m.id, ci.name
             ORDER BY $1:raw $2:raw
             LIMIT $3:raw
             OFFSET $4) m
             UNION ALL 
             SELECT json_agg(m) FROM (SELECT count(*) FROM masters) m`,
    [orderby, order, limit, offset]
  )
  const data = { items: list[0].item, count: list[1].item[0].count }
  return res.json(data)
}

const remove = async (req, res) => {
  const { id } = req.params
  await pool.none(`DELETE FROM masters WHERE id = $1`, [id])
  return res.json('Master was deleted')
}

const add = async (req, res) => {
  const { name, surname, city } = req.body
  await pool.none(
    `INSERT INTO
     masters (name, surname, city)
     VALUES($1, $2, $3)`,
    [name, surname, city]
  )
  return res.json('Master was added')
}

module.exports = { update, add, remove, getList, getKeys }
