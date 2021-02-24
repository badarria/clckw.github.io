'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('services', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
          },
          time: {
            type: Sequelize.STRING,
            allowNull: false,
          },
        })
        await queryInterface.addIndex('services', ['name'], { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.dropTable('services', { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
}
