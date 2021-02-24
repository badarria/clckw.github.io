'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('masters', {
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
          city_id: {
            type: Sequelize.INTEGER,
            references: {
              model: 'cities',
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
        await queryInterface.dropTable('masters', { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
}
