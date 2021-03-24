import { INTEGER, STRING, QueryInterface } from 'sequelize/types'

const customer = {
  up: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('customers', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: INTEGER,
            onUpdate: 'set null',
            onDelete: 'set null',
          },
          name: {
            type: STRING,
            allowNull: false,
          },
          surname: {
            type: STRING,
            allowNull: false,
          },
          user_id: {
            type: INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
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

export { customer }
