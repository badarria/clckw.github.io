const pool = require('../../../db');


const update = async (req, res) => {
	const {id} = req.params;
	const {name} = req.body;
	await pool.query(
			`UPDATE cities
 				SET name = $1
 				WHERE id = $2`, [name, id]
	);
	return res.json('City was updated')
}

const getList = async (req, res) => {
	const citiesList = await pool.query(
		"SELECT * FROM cities")
	return res.json(citiesList.rows)
}

const remove = async (req, res) => {
	const {id} = req.params;
	await pool.query(
			`DELETE FROM cities
 												WHERE id = $1`, [id]);
	return res.json("City was deleted")
}

const add = async (req, res) => {
	const {name} = req.body;
	await pool.query(`INSERT INTO cities
 																		(name) VALUES($1)`, [name]
	);
	return res.json('City was added')
}

module.exports = {add, remove, getList, update}