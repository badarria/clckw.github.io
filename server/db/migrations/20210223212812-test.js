'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('test', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          name: {
            type: Sequelize.STRING,
          },
          city: {
            type: Sequelize.STRING,
          },
        })
        await queryInterface.addColumn('test', 'email', { type: Sequelize.STRING }, { transaction: t })
        await queryInterface.changeColumn('test', 'email', { type: Sequelize.CITEXT }, { transaction: t })
        await queryInterface.renameColumn('test', 'email', 'mail', { transaction: t })
        await queryInterface.addIndex('test', ['mail'], { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.removeIndex('test', ['mail'], { transaction: t })
        await queryInterface.renameColumn('test', 'mail', 'email', { transaction: t })
        await queryInterface.changeColumn('test', 'email', { type: Sequelize.STRING }, { transaction: t })
        await queryInterface.removeColumn('test', 'email', { transaction: t })
        await queryInterface.dropTable('test', { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
}
