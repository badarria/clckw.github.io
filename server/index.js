const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db')

//middleware
app.use(cors())
app.use(express.json());//req.body


//POST  new city
app.post('/admin/cities', async (req, res) => {
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
//GET all cities
app.get('/admin/cities', async (req, res) => {
	try {
		const allCities = await pool.query(
			"SELECT * FROM cities"
		);
		res.json(allCities.rows)
	} catch (e) {
		console.error(e.message)
	}
})
//GET city
app.get('/admin/cities/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const getCity = await pool.query(
			"SELECT * FROM cities WHERE id_city = $1", [id]
		);
		res.json(getCity.rows[0])
	} catch (e) {
		console.error(e.message)
	}
})
//PUT new city
app.put('/admin/cities/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const {city} = req.body;
		const updateCity = await pool.query(
			"UPDATE cities SET name = $1 WHERE id = $2", [city, id]
		);
		res.json("City was updated")
	} catch (e) {
		console.error(e.message)
	}
})
//DELETE a city
app.delete('/admin/cities/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const delCity = await pool.query(
			"DELETE FROM cities WHERE id = $1", [id]
		);
		res.json("City was deleted")
	} catch (e) {
		console.error(e.message)
	}
})

//POST masters list
app.post("/admin/masters", async (req, res) => {
	try {
		const {name, surname, rating, cityId} = req.body;
		const newMaster = await pool.query(
			"INSERT INTO masters (name, surname, rating, cityId) VALUES ($1, $2, $3, $4) RETURNING *",
			[name, surname, rating, cityId]
		);
		res.json(newMaster.rows);
	} catch (e) {
		console.error(e.message)
	}
})


//GET (customers list)
app.get('/admin/customers', async(req, res) => {
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
app.delete('/admin/customers/:id', async (req, res) => {
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



app.listen(5000, () => {
	console.log('Server has started on port 5000..')
})