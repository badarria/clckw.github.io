import { INTEGER, STRING } from 'sequelize'
;('use strict')

import { QueryInterface } from 'sequelize/types'

export default {
  up: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('customers', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: INTEGER,
          },
          name: {
            type: STRING,
            allowNull: false,
          },
          surname: {
            type: STRING,
            allowNull: false,
          },
          email: {
            type: STRING,
            unique: true,
            allowNull: false,
          },
        })
        await queryInterface.addIndex('customers', ['email'], { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
  down: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.dropTable('customers', { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
}
