import { QueryInterface, INTEGER, STRING } from 'sequelize/types'
;('use strict')
export default {
  up: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('services', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: INTEGER,
          },
          name: {
            type: STRING,
            unique: true,
            allowNull: false,
          },
          time: {
            type: STRING,
            allowNull: false,
          },
        })
        await queryInterface.addIndex('services', ['name'], { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
  down: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.dropTable('services', { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
}
