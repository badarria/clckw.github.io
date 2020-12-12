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


//GET orders related data
// router.get('/foreignKeys', async (req, res) => {
// 	try {
// 		const masters = await pool.query("select id, name || ' ' || surname as name, city as city_id from masters");
// 		const customers = await pool.query("select id, name || ' ' || surname as name from customers");
// 		const services = await pool.query("select id, name from services");
// 		const cities = await pool.query("select * from cities")
// 		res.json({"master": [...masters.rows], "customer": [...customers.rows], "service": [...services.rows], "city": [...cities.rows]});
// 	} catch (err) {
// 		console.error(err.message)
// 	}
// })


//PUT order
router.put('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const {master, customer, service, date, begintAt, endAt} = req.body;
		const updateOrder = await pool.query(
			"UPDATE orders SET master = $1, customer = $2, service = $3, begintAt = $4, endAt = $5 orderDate=$6 WHERE id = $7", [master, customer, service, begintAt, endAt, date, id]
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
			"SELECT o.id, o.master as master_id, o.service as service_id, s.time as service_time, o.customer as customer_id, s.name as service, m.name || ' ' || m.surname as master, c.name || ' ' || c.surname as customer, ci.name as city, to_char(o.orderDate, 'dy DD-MM-YY') as date, to_char(o.beginAt, 'HH24:MI') as begin, to_char(o.endAt, 'HH24:MI') as end FROM orders o LEFT JOIN masters m ON o.master=m.id LEFT JOIN customers c ON o.customer = c.id LEFT JOIN services s ON o.service=s.id LEFT JOIN cities ci ON m.city = ci.id;"
		)
		console.log(res.json(ordersList.rows))
	} catch (e) {
		console.error(e.message)
	}
})
// ;

router.get('/filtered/:date/:master_id/:order_id', async (req, res) => {
	try {
		const {master_id, date, order_id} = req.params;
		const filteredOrders = await pool.query("SELECT to_char(beginAt, 'HH24:MI') as begin, to_char(endAt, 'HH24:MI') as end FROM orders WHERE orderDate = $1 and master = $2 and id != $3" , [date, master_id, order_id])
		console.log(res.json(filteredOrders.rows))
	} catch (e) {
		console.error(e.message)
	}
})


// router.get('/filtered', async(req, res) => {
// 	try {
// 		const list = await pool.query("SELECT begintAt as start, endAt as end FROM  ")
// 	} catch (err) {
// 		console.error(err.message)
// 	}
//
// })

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
		const {master_id, customer_id, service_id, city_id, start, end} = req.body;
		const newOrder = await pool.query(
			"INSERT INTO orders (master, customer, service, cityId, begintAt, endAt) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [master_id, customer_id, service_id, city_id, start, end]
		);
		res.json(newOrder.rows[0])
	} catch (e) {
		console.error(e.message);
	}
})


module.exports = router;



