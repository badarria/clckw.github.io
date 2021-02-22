const { Sequelize } = require('sequelize')
const config = require('../../config')
const connectionString = config.db

const sequelize = new Sequelize(connectionString)

module.exports = { sequelize }
