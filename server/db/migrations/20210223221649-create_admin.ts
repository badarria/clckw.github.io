import { QueryInterface, TEXT, UUID } from 'sequelize/types'
export default {
  up: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('admin', {
          id: {
            type: UUID,
            allowNull: false,
            primaryKey: true,
          },
          name: {
            type: TEXT,
            allowNull: false,
          },
          password: {
            type: TEXT,
            allowNull: false,
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
        await queryInterface.dropTable('admin', { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
}
