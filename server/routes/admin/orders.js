const router = require('express').Router();
const pool = require('../../db');


//Get orders columnNames
router.get('/columnNames', async (req, res) => {
	try {
		const getColumnNames = await pool.query(
			"SELECT column_name FROM information_schema.columns WHERE table_name = 'orders' order by ordinal_position");
		res.json(getColumnNames.rows);
	} catch (err) {
		console.error(err.message)

	}
})

// router.get('/foreignKeys', async (req, res) => {
// 	try {
// 		const getCityNames = await pool.query(
// 			"SELECT * FROM cities");
// 		res.json({city: getCityNames.rows})
//
// 	} catch (err) {
// 		console.error(err.message)
// 	}
// })

//GET orders related data
router.get('/foreignKeys', async (req, res) => {
	try {
		const masters = await pool.query("select id, name || ' ' || surname as name from masters");
		const customers = await pool.query("select id, name || ' ' || surname as name from customers");
		const services = await pool.query("select id, name from services");
		const cities = await pool.query("select * from cities")
		res.json({"master": [...masters.rows], "customer": [...customers.rows], "service": [...services.rows], "city": [...cities.rows]});
	} catch (err) {
		console.error(err.message)
	}
})


//PUT order
router.put('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const {master, customer, service, startAt, endAt} = req.body;
		const updateOrder = await pool.query(
			"UPDATE orders SET master = $1, customer = $2, service = $3, startAt = $4, endAt = $5 WHERE id = $6", [master, customer, service, startAt, endAt, id]
		);
		res.json("Order was updated")
	} catch (e) {
		console.error(e.message)
	}
})

//GET (orders list)
router.get('/', async (req, res) => {
	try {
		const ordersList = await pool.query(
			"SELECT o.id, o.masterID as master_id, o.serviceID as service_id, o.customerID as customer_id, o.cityID as city_id, m.name as master, c.name as customer, s.name as service, ci.name as city, to_char(startAt, 'Dy DD/MM/YY HH24:MI') as start, to_char(endAt, 'DD/MM/YY HH24:MI') as end FROM orders o LEFT JOIN masters m ON o.masterId=m.id LEFT JOIN customers c ON o.customerId = c.id LEFT JOIN services s ON o.serviceId=s.id LEFT JOIN cities ci ON o.cityId = ci.id"
		)
		console.log(res.json(ordersList.rows))
	} catch (e) {
		console.error(e.message)
	}
})
// ;


//DELETE
router.delete('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const delOrder = await pool.query(
			"DELETE FROM orders WHERE id = $1", [id]
		);
		res.json("Customer was deleted")
	} catch (e) {
		console.error(e.message)
	}
})
//POST new order
router.post('/', async (req, res) => {
	try {
		const {master, customer, service, startAt, endAt} = req.body;
		const newOrder = await pool.query(
			"INSERT INTO orders (master, customer, service, startAt, endAt) VALUES($1, $2, $3, $4, $5) RETURNING *", [master, customer, service, startAt, endAt]
		);
		res.json(newOrder.rows[0])
	} catch (e) {
		console.error(e.message);
	}
})


module.exports = router;



