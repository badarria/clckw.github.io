'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('orders', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          rating: Sequelize.INTEGER,
          beginat: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          finishat: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          customer_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'customers',
              key: 'id',
              onUpdate: 'SET NULL',
              onDelete: 'SET NULL',
            },
          },
          master_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'masters',
              key: 'id',
              onUpdate: 'SET NULL',
              onDelete: 'SET NULL',
            },
          },
          service_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'services',
              key: 'id',
              onUpdate: 'SET NULL',
              onDelete: 'SET NULL',
            },
          },
        })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.dropTable('orders', { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
}
