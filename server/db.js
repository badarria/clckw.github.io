const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'postgres',
	password: '2442',
	host: 'localhost',
	port: 5432,
	database: 'clockware'
})

module.exports = pool;