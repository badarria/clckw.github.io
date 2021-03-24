import { QueryInterface, INTEGER, STRING } from 'sequelize/types'

const cities = {
  up: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('cities', {
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
            unique: true,
            allowNull: false,
          },
        })
        await queryInterface.addIndex('cities', ['name'], { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
  down: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.dropTable('cities', { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
}

export { cities }
