const router = require('express').Router();
const pool = require('../../db');


router.put('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const {name} = req.body;
		await pool.query(
			"UPDATE cities SET name = $1 WHERE id = $2", [name, id]
		);
		res.json("City was updated")
	} catch (e) {
		console.error(e.message)
	}
})


router.get('/', async (req, res) => {
	try {
		const citiesList = await pool.query(
			"SELECT * FROM cities"
		)
		res.json(citiesList.rows)
	} catch (e) {
		console.error(e.message)
	}
})


router.delete('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		await pool.query(
			"DELETE FROM cities WHERE id = $1", [id]
		);
		res.json("City was deleted")
	} catch (e) {
		console.error(e.message)
	}
})

router.post('/', async (req, res) => {
	try {
		const {name} = req.body;
		const newItem = await pool.query(
			"INSERT INTO cities (name) VALUES($1) RETURNING *", [name]
		);
		res.json("City was added")
	} catch (e) {
		console.error(e.message);
	}
})


module.exports = router;