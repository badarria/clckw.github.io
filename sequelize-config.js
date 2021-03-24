require('dotenv').config()

module.exports = {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: 'postgres',
  },
  testing: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    // username: process.env.PG_USER,
    // password: process.env.PG_PASSWORD,
    // database: process.env.PG_DATABASE,
    // host: process.env.PG_HOST,
    dialect: 'postgres',
  },
}
