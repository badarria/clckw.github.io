const router = require('express').Router();
const pool = require('../../db');



router.get('/foreignKeys', async (req, res) => {
	try {
		const getKeys = await pool.query(
			"SELECT * FROM cities");
		res.json({city: getKeys.rows})
	} catch (err) {
		console.error(err.message)
	}
})


router.put('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const {name, surname, rating, city} = req.body;
		await pool.query(
			"UPDATE masters SET name = $1, surname = $2, rating = $3, city = $4 WHERE id = $5", [name, surname, rating, city, id]
		);
		res.json("Master was updated")
	} catch (e) {
		console.error(e.message)
	}
})


router.get('/', async (req, res) => {
	try {
		const list = await pool.query(
			"SELECT m.id, m.name, m.surname, ci.name as city, m.city as city_id, m.rating FROM masters m LEFT JOIN cities ci ON m.city = ci.id"
		)
		res.json(list.rows)
	} catch (e) {
		console.error(e.message)
	}
})


router.delete('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		await pool.query(
			"DELETE FROM masters WHERE id = $1", [id]
		);
		res.json("Master was deleted")
	} catch (e) {
		console.error(e.message)
	}
})


router.post('/', async (req, res) => {
	try {
		const {name, surname, city_id, rating} = req.body;
		const newItem = await pool.query(
			"INSERT INTO masters (name, surname, city, rating) VALUES($1, $2, $3, $4) RETURNING *", [name, surname, city_id, rating]
		);
		res.json("Master was added")
	} catch (e) {
		console.error(e.message);
	}
})


module.exports = router;