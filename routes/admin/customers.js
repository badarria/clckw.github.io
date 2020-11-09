const router = require('express').Router();
const pool = require('../../db');



//Get customers columnNames
router.get('/columnNames',async (req, res) => {
	try {
		const getColumnNames = await pool.query(
			"SELECT column_name FROM information_schema.columns WHERE table_name = 'customers' order by ordinal_position");
		res.json(getColumnNames.rows);
	} catch (err) {
		console.error(err.message)

	}
})

//PUT customer
router.put('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const {name, surname, email} = req.body;
		const updateCustomer = await pool.query(
			"UPDATE customers SET name = $1, surname = $2, email = $3 WHERE id = $4", [name, surname, email, id]
		);
		res.json("Customer was updated")
	} catch (e) {
		console.error(e.message)
	}
})

//GET (customers list)
router.get('/', async (req, res) => {
	try {
		const customersList = await pool.query(
			"SELECT * FROM customers"
		)
		res.json(customersList.rows)
	} catch (e) {
		console.error(e.message)
	}
})

//DELETE (a customer)
router.delete('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const delCity = await pool.query(
			"DELETE FROM customers WHERE id = $1", [id]
		);
		res.json("Customer was deleted")
	} catch (e) {
		console.error(e.message)
	}
})
//POST new customer
router.post('/', async (req, res) => {
	try {
		const {name, surname, email} = req.body;
		const newCity = await pool.query(
			"INSERT INTO customers (name, surname, email) VALUES($1, $2, $3) RETURNING *", [name, surname, email]
		);
		res.json(newCity.rows[0])
	} catch (e) {
		console.error(e.message);
	}
})

module.exports = router;