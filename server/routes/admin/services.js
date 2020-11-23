const router = require('express').Router();
const pool = require('../../db');


//Get services columnNames
router.get('/columnNames',async (req, res) => {
	try {
		const getColumnNames = await pool.query(
			"SELECT column_name FROM information_schema.columns WHERE table_name = 'services' order by ordinal_position");
		res.json(getColumnNames.rows);
	} catch (err) {
		console.error(err.message)
	}
})


//PUT service
router.put('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const {name, time} = req.body;
		const updateService = await pool.query(
			"UPDATE services SET name = $1, time = $2 WHERE id = $3", [name, time, id]
		);
		res.json("Service was updated")
	} catch (e) {
		console.error(e.message)
	}
})

//GET (services list)
router.get('/', async (req, res) => {
	try {
		const servicesList = await pool.query(
			"SELECT * FROM services"
		)
		res.json(servicesList.rows)
	} catch (e) {
		console.error(e.message)
	}
})

//DELETE (a service)
router.delete('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const delService = await pool.query(
			"DELETE FROM services WHERE id = $1", [id]
		);
		res.json("Service was deleted")
	} catch (e) {
		console.error(e.message)
	}
})
//POST new service
router.post('/', async (req, res) => {
	try {
		const {name, time} = req.body;
		const newService = await pool.query(
			"INSERT INTO services (name, time) VALUES($1, $2) RETURNING *", [name, time]
		);
		res.json(newService.rows[0])
	} catch (e) {
		console.error(e.message);
	}
})



module.exports = router;