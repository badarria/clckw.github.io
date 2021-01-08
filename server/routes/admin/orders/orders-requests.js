const pool = require('../../../db')

const update = async (req, res) => {
  const { id } = req.params
  const { master, customer, service, begin, end } = req.body
  await pool.query(
    `UPDATE orders
           SET master = $1, customer = $2,
           service = $3, beginAt = $4,
           endAt = $5 WHERE id = $6`,
    [master, customer, service, begin, end, id]
  )
  return res.json('Order was updated')
}

const getList = async (req, res) => {
  let { orderby, order, limit, offset } = req.params
  limit = limit === '-1' ? 'all' : limit
  if (orderby === 'date' || orderby === 'begin') {
    orderby = 'beginat'
  } else if (orderby === 'end') {
    orderby = 'endat'
  }

  const list = await pool.any(
    `SELECT json_agg(o) as item FROM ( SELECT
           o.id, o.master as master_id,
           o.service as service_id,
           s.time as service_time,
           o.customer as customer_id,
           s.name as service,
           m.name || ' ' || m.surname as master,
           c.name || ' ' || c.surname as customer,
           ci.name as city,
           to_char(o.beginAt, 'dy DD/MM/YYYY') as date,
           to_char(o.beginAt, 'HH24:MI') as begin,
           to_char(o.endAt, 'HH24:MI') as end
           FROM orders o
           LEFT JOIN masters m ON o.master=m.id
           LEFT JOIN customers c ON o.customer = c.id
           LEFT JOIN services s ON o.service=s.id
           LEFT JOIN cities ci ON m.city = ci.id
           ORDER BY $1:raw $2:raw
           LIMIT $3:raw
           OFFSET $4) o
           UNION ALL
           SELECT json_agg(o) FROM (SELECT count(*) FROM orders) o`,
    [orderby, order, limit, offset]
  )
  const data = { items: list[0].item, count: list[1].item[0].count }
  return res.json(data)
}

const getFiltered = async (req, res) => {
  const { master_id, date, order_id } = req.query
  const filteredOrders = await pool.any(
    `SELECT
        to_char(beginAt, 'HH24:MI') as begin,
        to_char(endAt, 'HH24:MI') as end
        FROM orders WHERE cast(beginAt as date) = $1::timestamp
        and master = $2 and id != $3`,
    [date, master_id, order_id]
  )
  return res.json(filteredOrders)
}

const getKeys = async (req, res) => {
  const keys = await pool.any(`
  SELECT json_agg(m) as key FROM (SELECT id, name || ' ' || surname as name, city as city_id FROM masters) m
  UNION ALL 
  SELECT json_agg(c) FROM (SELECT id, name || ' ' || surname as name FROM customers) c
  UNION ALL
  SELECT json_agg(s) FROM (SELECT id, name, time FROM services) s `)
  const data = {
    master: keys[0].key,
    customer: keys[1].key,
    service: keys[2].key,
  }
  return res.json(data)
}

const remove = async (req, res) => {
  const { id } = req.params
  await pool.none(`DELETE FROM orders WHERE id = $1`, [id])
  return res.json('Order was deleted')
}

const add = async (req, res) => {
  const { master, customer, service, begin, end } = req.body
  await pool.none(
    `INSERT
           INTO orders(master, customer, service, beginAt, endAt)
           VALUES($1, $2, $3, $4, $5)`,
    [master, customer, service, begin, end]
  )
  return res.json('Order was added')
}

module.exports = { remove, add, getKeys, getFiltered, getList, update }
