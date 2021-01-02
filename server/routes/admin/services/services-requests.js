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
  const { limit, offset } = req.params;
  const list = await pool.query(
    `SELECT * FROM services
                    ORDER BY id
                    LIMIT $1
                    OFFSET $2`,
    [limit, offset]
  );
  return res.json(list.rows);
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
