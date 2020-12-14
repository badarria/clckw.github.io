const router = require('express').Router();
const pool = require('../../db');


//Get free masters in city
router.get('/find/:city/:begin/:end', async (req, res) => {
	try {
		const {city, begin, end} = req.params;
		const findFreeMasters = await pool.query(
			"SELECT DISTINCT ON (m.id) m.id, m.name, m.surname FROM masters m LEFT JOIN newOrders o ON o.master = m.id WHERE m.city= $1 AND NOT ($2::timestamp, $3::timestamp ) OVERLAPS (o.beginAt, o.endAt)", [city, begin, end]);
		res.json(findFreeMasters.rows);
	} catch (err) {
		console.error(err.message)
	}
})


module.exports = router;