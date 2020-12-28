const router = require('express').Router();
const pool = require('../../db');


//Get free masters in city
router.get('/find/:city/:begin/:end', async (req, res) => {
	try {
		const {city, begin, end} = req.params;
		const findFreeMasters = await pool.query(`WITH excepted_masters as (
								SELECT
								m.id, m.name, m.surname FROM masters m where m.city=$1
								EXCEPT
								select o.master, m.name, m.surname
								FROM orders o JOIN masters m
								ON o.master=m.id
								WHERE ($2::timestamp, $3::timestamp )
								OVERLAPS (o.beginAt, o.endAt)
						)
				SELECT em.id, em.name, em.surname, COALESCE(round(avg(o.rating)::numeric), 5) as rating
					FROM excepted_masters em
					LEFT JOIN orders o ON em.id=o.master
					GROUP BY em.id, em.name, em.surname`, [city, begin, end])

		res.json(findFreeMasters.rows);
	} catch (err) {
		console.error(err.message)
	}
})

router.post('/customer', async (req, res) => {
	try {
		const {email, name, surname} = req.body;
		const id = await pool.query(`
					INSERT INTO customers
					(name, surname, email)
					VALUES($1, $2, $3)
					ON CONFLICT (email)
					DO UPDATE SET name=$1, surname=$2
					WHERE customers.email=$3
					Returning id`, [name, surname, email]);
		res.json(id.rows);
	} catch (err) {
		console.error(err.message)
	}
})



module.exports = router;

