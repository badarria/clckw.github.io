import { DATE, INTEGER, QueryInterface } from 'sequelize/types'
;('use strict')
export default {
  up: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('orders', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: INTEGER,
          },
          rating: INTEGER,
          beginat: {
            type: DATE,
            allowNull: false,
          },
          finishat: {
            type: DATE,
            allowNull: false,
          },
          customer_id: {
            type: INTEGER,
            references: {
              model: 'customers',
              key: 'id',
              // onUpdate: 'SET NULL',
              // onDelete: 'SET NULL',
            },
          },
          master_id: {
            type: INTEGER,
            references: {
              model: 'masters',
              key: 'id',
              // onUpdate: 'SET NULL',
              // onDelete: 'SET NULL',
            },
          },
          service_id: {
            type: INTEGER,
            references: {
              model: 'services',
              key: 'id',
              // onUpdate: 'SET NULL',
              // onDelete: 'SET NULL',
            },
          },
        })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
  down: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.dropTable('orders', { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
}
