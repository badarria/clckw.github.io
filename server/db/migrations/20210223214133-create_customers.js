'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('customers', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          surname: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            type: Sequelize.CITEXT,
            allowNull: false,
          },
        })
        await queryInterface.addIndex('customers', ['email'], { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.dropTable('customers', { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
}
