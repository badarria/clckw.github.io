const router = require('express').Router();
const pool = require('../../db');


router.put('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const {name, time} = req.body;
		await pool.query(
			"UPDATE services SET name = $1, time = $2 WHERE id = $3", [name, time, id]
		);
		res.json('Service was updated')
	} catch (e) {
		res.json('error')
	}
})


router.get('/', async (req, res) => {
	try {
		const list = await pool.query(
			"SELECT * FROM services"
		)
		res.json(list.rows)
	} catch (e) {
		res.json(e.message)
	}
})


router.delete('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		await pool.query(
			"DELETE FROM services WHERE id = $1", [id]
		);
		res.json("Service was deleted")
	} catch (e) {
		res.json("error")
	}
})


router.post('/', async (req, res) => {
	try {
		const {name, time} = req.body;
		const newItem = await pool.query(
			"INSERT INTO services (name, time) VALUES($1, $2)", [name, time]
		);
		res.json('Service was added')
	} catch (e) {
		res.json('error')
	}
})


module.exports = router;