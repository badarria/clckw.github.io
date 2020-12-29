const pool = require('../../../db');


const update = async (req, res) => {
	const {id} = req.params;
	const {name, surname, email} = req.body;
	await pool.query(
			`UPDATE customers
											SET name = $1, surname = $2, email = $3
											WHERE id = $4`,
		[name, surname, email, id]);
	return res.json("Customer was updated")
}

const getList = async (req, res) => {
	const list = await pool.query(
		`SELECT * FROM customers`)
	res.json(list.rows)
	return res.json(list.rows)
}

const remove = async (req, res) => {
	const {id} = req.params;
	await pool.query(`
											DELETE FROM customers
											WHERE id = $1`, [id]);
	return res.json("Customer was deleted")
}

const add = async (req, res) => {
	const {name, surname, email} = req.body;
	await pool.query(`
											INSERT INTO customers
											(name, surname, email)
											VALUES($1, $2, $3)`, [name, surname, email]);
	return res.json("Customer was added")
}

module.exports = {add, remove, getList, update}