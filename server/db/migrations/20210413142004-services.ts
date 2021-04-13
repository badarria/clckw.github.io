import { QueryInterface, DataTypes } from 'sequelize'

export default {
  up: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('services', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            onUpdate: 'set null',
            onDelete: 'set null',
          },
          name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
          },
          time: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
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
