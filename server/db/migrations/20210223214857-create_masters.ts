import { INTEGER, QueryInterface, STRING } from 'sequelize/types'
;('use strict')
export default {
  up: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('masters', {
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
          city_id: {
            type: INTEGER,
            references: {
              model: 'cities',
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
        await queryInterface.dropTable('masters', { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
}
