import { QueryInterface, DataTypes } from 'sequelize'

export default {
  up: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('test', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
          },
          name: {
            type: DataTypes.STRING,
            unique: true,
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
        await queryInterface.dropTable('test', { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
}
