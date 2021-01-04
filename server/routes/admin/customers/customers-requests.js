const pool = require("../../../db");

const update = async (req, res) => {
  const { id } = req.params;
  const { name, surname, email } = req.body;
  await pool.none(
    `UPDATE customers
           SET name = $1, surname = $2, email = $3
           WHERE id = $4`,
    [name, surname, email, id]
  );
  return res.json("Customer was updated");
};

const getList = async (req, res) => {
  let { orderby, order, limit, offset } = req.params;
  limit = limit === "-1" ? "all" : limit;

  const list = await pool.any(
    `SELECT json_agg(c) as item FROM
       (SELECT * FROM customers
       ORDER BY $1:raw $2:raw
       LIMIT $3:raw OFFSET $4) c
     UNION ALL
     SELECT json_agg(c) FROM
       (SELECT count(*) FROM customers) c`,
    [orderby, order, limit, offset]
  );
  const data = { items: list[0].item, count: list[1].item[0].count };
  return res.json(data);
};

const remove = async (req, res) => {
  const { id } = req.params;
  await pool.none(`DELETE FROM customers WHERE id = $1`, [id]);
  return res.json("Customer was deleted");
};

const add = async (req, res) => {
  const { name, surname, email } = req.body;
  await pool.none(
    `INSERT INTO customers
             (name, surname, email)
             VALUES($1, $2, $3)`,
    [name, surname, email]
  );
  return res.json("Customer was added");
};

module.exports = { add, remove, getList, update };
