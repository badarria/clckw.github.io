const pgp = require("pg-promise")({});
const app = require("express")();
const config = require("../config");
const env = app.get("env");

const connectionString = config[env].db;

const pool = pgp(connectionString);

module.exports = pool;
