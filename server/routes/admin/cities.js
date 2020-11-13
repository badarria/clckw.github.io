const router = require('express').Router();
const pool = require('../../db');


//GET cities columnNames
router.get('/columnNames', async (req, res) => {
	try {
		const getColumnNames = await pool.query(
			"SELECT column_name FROM information_schema.columns WHERE table_name = 'cities' order by ordinal_position");
		res.json(getColumnNames.rows);
	} catch (err) {
		console.error(err.message)
	}
})

//PUT master
router.put('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const {name} = req.body;
		const updateCity = await pool.query(
			"UPDATE cities SET name = $1 WHERE id = $2", [name, id]
		);
		res.json("City was updated")
	} catch (e) {
		console.error(e.message)
	}
})

//GET (cities list)
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

//DELETE
router.delete('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const delCity = await pool.query(
			"DELETE FROM cities WHERE id = $1", [id]
		);
		res.json("Customer was deleted")
	} catch (e) {
		console.error(e.message)
	}
})
//POST new city
router.post('/', async (req, res) => {
	try {
		const {name} = req.body;
		const newCity = await pool.query(
			"INSERT INTO cities (name) VALUES($1) RETURNING *", [name]
		);
		res.json(newCity.rows[0])
	} catch (e) {
		console.error(e.message);
	}
})


module.exports = router;