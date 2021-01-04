// const Pool = require("pg").Pool;
const pgp = require("pg-promise")({});
// const db = pgp(connection);
require("dotenv").config();

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const proConfig = process.env.DATABASE_URL;
const connectionString =
  process.env.NODE_ENV === "production" ? proConfig : devConfig;

const pool = pgp(connectionString);

module.exports = pool;
