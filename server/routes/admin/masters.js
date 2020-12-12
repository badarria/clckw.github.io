const router = require('express').Router();
const pool = require('../../db');


//GET masters columnNames
router.get('/columnNames', async (req, res) => {
	try {
		const getColumnNames = await pool.query(
			"SELECT column_name FROM information_schema.columns WHERE table_name = 'masters' order by ordinal_position");
		res.json(getColumnNames.rows);
	} catch (err) {
		console.error(err.message)
	}
})

//GET Foreign keys for masters
router.get('/foreignKeys', async (req, res) => {
	try {
		const getCityNames = await pool.query(
			"SELECT * FROM cities");
		res.json({city: getCityNames.rows})
	} catch (err) {
		console.error(err.message)
	}
})

//PUT master
router.put('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const {name, surname, rating, city_id} = req.body;
		const updateMaster = await pool.query(
			"UPDATE masters SET name = $1, surname = $2, rating = $3, city = $4 WHERE id = $5", [name, surname, rating, city_id, id]
		);
		res.json("Master was updated")
	} catch (e) {
		console.error(e.message)
	}
})

//GET (masters list)
router.get('/', async (req, res) => {
	try {
		const mastersList = await pool.query(
			"SELECT m.id, m.name, m.surname, ci.name as city, m.city as city_id, m.rating FROM masters m LEFT JOIN cities ci ON m.city = ci.id"
		)
		res.json(mastersList.rows)
	} catch (e) {
		console.error(e.message)
	}
})

//DELETE (a master)
router.delete('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const delMaster = await pool.query(
			"DELETE FROM masters WHERE id = $1", [id]
		);
		res.json("Customer was deleted")
	} catch (e) {
		console.error(e.message)
	}
})
//POST new master
router.post('/', async (req, res) => {
	try {
		const {name, surname, city_id, rating} = req.body;
		const newCity = await pool.query(
			"INSERT INTO masters (name, surname, city, rating) VALUES($1, $2, $3, $4) RETURNING *", [name, surname, city_id, rating]
		);
		res.json(newCity.rows[0])
	} catch (e) {
		console.error(e.message);
	}
})


module.exports = router;