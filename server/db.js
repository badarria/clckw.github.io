const pgp = require('pg-promise')({})

const config = require('../config')
// const env = app.get('env')

const connectionString = config.db

const pool = pgp(connectionString)

module.exports = pool
