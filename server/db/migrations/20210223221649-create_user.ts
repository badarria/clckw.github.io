import { QueryInterface, TEXT, INTEGER, UUID } from 'sequelize/types'

export default {
  up: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('user', {
          id: {
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            onDelete: 'cascade',
            onUpdate: 'cascade',
          },
          salt: { type: TEXT, allowNull: false },
          role: { type: TEXT, allowNull: false },
          email: {
            type: TEXT,
            allowNull: false,
            unique: true,
          },
          pass: {
            type: TEXT,
            allowNull: false,
          },
          token: {
            type: UUID,
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
