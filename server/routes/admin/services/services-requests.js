const pool = require("../../../db");

const update = async (req, res) => {
  const { id } = req.params;
  const { name, time } = req.body;
  await pool.query(
    `UPDATE services
                    SET name = $1,
                    time = $2
                    WHERE id = $3`,
    [name, time, id]
  );
  return res.json("Service was updated");
};

const getList = async (req, res) => {
  let { orderby, order, limit, offset } = req.params;
  limit = limit === "-1" ? "all" : limit;

  const list = await pool.any(
    `SELECT json_agg(s) as item FROM
         (SELECT * FROM services
          ORDER BY $1:raw $2:raw
          LIMIT $3:raw
          OFFSET $4) s
     UNION ALL
     SELECT json_agg(s) FROM (SELECT count(*) FROM services) s`,
    [orderby, order, limit, offset]
  );
  const data = { items: list[0].item, count: list[1].item[0].count };
  return res.json(data);
};

const remove = async (req, res) => {
  const { id } = req.params;
  await pool.query(`DELETE FROM services WHERE id = $1`, [id]);
  return res.json(`Service was deleted`);
};

const add = async (req, res) => {
  const { name, time } = req.body;
  const newItem = await pool.query(
    `INSERT INTO services (name, time) VALUES($1, $2)`,
    [name, time]
  );
  return res.json("Service was added");
};

module.exports = { add, remove, getList, update };
