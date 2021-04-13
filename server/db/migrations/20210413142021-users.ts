import { QueryInterface, DataTypes } from 'sequelize'

export default {
  up: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('users', {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            onDelete: 'cascade',
            onUpdate: 'cascade',
          },
          salt: { type: DataTypes.TEXT, allowNull: false },
          role: { type: DataTypes.TEXT, allowNull: false },
          email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
          },
          pass: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
          token: {
            type: DataTypes.TEXT,
            allowNull: false,
          },
        })
        await queryInterface.addIndex('users', ['email'], { transaction: t });
      })
    } catch (e) {
      console.error(e.message)
    }
  },
  down: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.dropTable('users', { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
}
