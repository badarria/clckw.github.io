const pool = require("../../../db");

const getKeys = async (req, res) => {
  const keys = await pool.query("SELECT * FROM cities");
  return res.json({ city: keys.rows });
};

const update = async (req, res) => {
  const { name, surname, city, id } = req.body;
  await pool.query(
    `UPDATE masters
                    SET name = $1, surname = $2, city = $3
                    WHERE id = $4`,
    [name, surname, city, id]
  );
  return res.json("Master was updated");
};

const getList = async (req, res) => {
  const { limit, offset } = req.params;
  const list = await pool.query(
    `SELECT m.id, m.name, m.surname,
                    ci.name as city,
                    m.city as city_id,
                    COALESCE(round(avg(o.rating)::numeric), 5) as rating
                    FROM masters m LEFT JOIN orders o ON m.id=o.master
                    LEFT JOIN cities ci ON m.city = ci.id
                    GROUP BY m.id, ci.name
                    ORDER BY id
                    LIMIT $1
                    OFFSET $2`,
    [limit, offset]
  );
  return res.json(list.rows);
};

const remove = async (req, res) => {
  const { id } = req.params;
  await pool.query(`DELETE FROM masters WHERE id = $1`, [id]);
  return res.json("Master was deleted");
};

const add = async (req, res) => {
  const { name, surname, city } = req.body;
  await pool.query(
    `INSERT INTO
                    masters (name, surname, city)
                    VALUES($1, $2, $3)`,
    [name, surname, city]
  );
  return res.json("Master was added");
};

module.exports = { update, add, remove, getList, getKeys };
