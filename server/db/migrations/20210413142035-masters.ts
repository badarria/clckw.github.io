import { DataTypes, QueryInterface, } from 'sequelize'

export default {
  up: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('masters', {
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
            allowNull: false,
          },
          surname: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          city_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'cities',
              key: 'id',
            },
          },
          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
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
