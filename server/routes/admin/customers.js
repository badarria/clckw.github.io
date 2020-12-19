const router = require('express').Router();
const pool = require('../../db');


router.put('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const {name, surname, email} = req.body;
		await pool.query(
			"UPDATE customers SET name = $1, surname = $2, email = $3 WHERE id = $4", [name, surname, email, id]
		);
		res.json("Customer was updated")
	} catch (e) {
		console.error(e.message)
	}
})


router.get('/', async (req, res) => {
	try {
		const list = await pool.query(
			"SELECT * FROM customers")
		console.log(res.json(list.rows))
		// res.json(res.rows)
	} catch (e) {
		console.error(e.message)
	}
})


router.delete('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		await pool.query(
			"DELETE FROM customers WHERE id = $1", [id]
		);
		res.json("Customer was deleted")
	} catch (e) {
		console.error(e.message)
	}
})


router.post('/', async (req, res) => {
	try {
		const {name, surname, email} = req.body;
		const newItem = await pool.query(
			"INSERT INTO customers (name, surname, email) VALUES($1, $2, $3) RETURNING *", [name, surname, email]
		);
		res.json("Customer was added")
	} catch (e) {
		console.error(e.message);
	}
})

module.exports = router;