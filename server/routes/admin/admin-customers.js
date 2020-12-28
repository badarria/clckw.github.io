const router = require('express').Router();
const pool = require('../../db');


router.put('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const {name, surname, email} = req.body;
		await pool.query(
				`UPDATE customers
											SET name = $1, surname = $2, email = $3
											WHERE id = $4`,
			[name, surname, email, id]);
		res.json("Customer was updated")
	} catch (e) {
		res.json("error")
	}
})


router.get('/', async (req, res) => {
	try {
		const list = await pool.query(
				`SELECT * FROM customers`)
		res.json(list.rows)
	} catch (e) {
		res.json(e.message)
	}
})


router.delete('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		await pool.query(`
											DELETE FROM customers
											WHERE id = $1`, [id]);
		res.json("Customer was deleted")
	} catch (e) {
		res.json("error")
	}
})


router.post('/', async (req, res) => {
	try {
		const {name, surname, email} = req.body;
		await pool.query(`
											INSERT INTO customers
											(name, surname, email)
											VALUES($1, $2, $3)`, [name, surname, email]);
		res.json("Customer was added")
	} catch (e) {
		res.json("error")
	}
})

module.exports = router;