const router = require('express').Router();
const pool = require('../../db');


router.put('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const {master, customer, service, begin, end} = req.body;
		console.log(master, customer, service, begin, end)
		await pool.query(
			"UPDATE orders SET master = $1, customer = $2, service = $3, beginAt = $4, endAt = $5 WHERE id = $6", [master, customer, service, begin, end, id]);
		res.json("Order was updated")
	} catch (e) {
		console.error(e.message)
	}
})


router.get('/', async (req, res) => {
	try {
		const list = await pool.query(
			"SELECT o.id, o.master as master_id, o.service as service_id, s.time as service_time, o.customer as customer_id, s.name as service, m.name || ' ' || m.surname as master, c.name || ' ' || c.surname as customer, ci.name as city, to_char(o.beginAt, 'dy DD/MM/YYYY') as date, to_char(o.beginAt, 'HH24:MI') as begin, to_char(o.endAt, 'HH24:MI') as end FROM orders o LEFT JOIN masters m ON o.master=m.id LEFT JOIN customers c ON o.customer = c.id LEFT JOIN services s ON o.service=s.id LEFT JOIN cities ci ON m.city = ci.id;"
		)
		console.log(res.json(list.rows))
	} catch (e) {
		console.error(e.message)
	}
})


router.get('/filtered/:date/:master_id/:order_id', async (req, res) => {
	try {
		const {master_id, date, order_id} = req.params;
		const filteredOrders = await pool.query("SELECT to_char(beginAt, 'HH24:MI') as begin, to_char(endAt, 'HH24:MI') as end FROM orders WHERE cast(beginAt as date) = $1::timestamp and master = $2 and id != $3" , [date, master_id, order_id])
		console.log(res.json(filteredOrders.rows))
	} catch (e) {
		console.error(e.message)
	}
})


router.get('/foreignKeys', async (req, res) => {
	try {
		const master = await pool.query(
			"SELECT id, name || ' ' || surname as name, city as city_id from masters;"
		);
		const customer = await pool.query("SELECT id, name || ' ' || surname as name from customers;");
		const service = await pool.query("SELECT id, name, time from services;");
		res.json({"master": [...master.rows], "customer": [...customer.rows], "service": [...service.rows]})
	} catch (e) {
		console.error(e.message)
	}
})



router.delete('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		await pool.query(
			"DELETE FROM orders WHERE id = $1", [id]
		);
		res.json("Customer was deleted")
	} catch (e) {
		console.error(e.message)
	}
})


router.post('/', async (req, res) => {
	try {
		const {master, customer, service, begin, end} = req.body;
		const newItem = await pool.query(
			"INSERT INTO orders (master, customer, service, beginAt, endAt) VALUES($1, $2, $3, $4, $5) RETURNING *", [master, customer, service, begin, end]
		);
		res.json(newItem.rows[0])
	} catch (e) {
		console.error(e.message);
	}
})


module.exports = router;



