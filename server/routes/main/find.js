const router = require('express').Router();
const pool = require('../../db');


//Get free masters in city
router.get('/find/:city/:begin/:end', async (req, res) => {
	try {
		const {city, begin, end} = req.params;
		const findFreeMasters = await pool.query("SELECT m.id, m.name, m.surname, m.rating FROM masters m where m.city=$1 EXCEPT select o.master, m.name, m.surname, m.rating FROM orders o JOIN masters m ON o.master=m.id WHERE ($2::timestamp, $3::timestamp ) OVERLAPS (o.beginAt, o.endAt)", [city, begin, end]);
		res.json(findFreeMasters.rows);
	} catch (err) {
		console.error(err.message)
	}
})

router.get('/customer/:email', async (req, res) => {
	try {
		const {email} = req.params;
		const findCustomer = await pool.query("SELECT id FROM customers WHERE email=$1", [email]);
		res.json(findCustomer.rows);
	} catch (err) {
		console.error(err.message)
	}
})



module.exports = router;

