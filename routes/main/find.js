const router = require('express').Router();
const pool = require('../../db');


//Get free masters in city
router.get('/find', async (req, res) => {
	try {
		const {city, startAt, endAt} = req.body;
		const findFreeMasters = await pool.query(
			"SELECT m.name, m.id, m.surname, m.city FROM masters m LEFT JOIN orders ON orders.master = m.id AND order.city = $1 AND NOT (timestamp $2, timestamp $3 ) OVERLAPS (orders.startAt, orders.endAt)", [city, startAt, endAt]);
		res.json(findFreeMasters.rows);
	} catch (err) {
		console.error(err.message)

	}
})


module.exports = router;