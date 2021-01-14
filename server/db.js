const pgp = require('pg-promise')({})

const config = require('../config')

const connectionString = config.db

const pool = pgp(connectionString)

module.exports = pool
