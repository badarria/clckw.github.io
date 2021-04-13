import { DataTypes, QueryInterface } from 'sequelize'

export default {
  up: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('orders', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
          },
          rating: DataTypes.INTEGER,
          beginat: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          finishat: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          customer_id: {
            type: DataTypes.INTEGER,
            onDelete: 'set null',
            onUpdate: 'set null',
            references: {
              model: 'customers',
              key: 'id',
            },
          },
          master_id: {
            type: DataTypes.INTEGER,
            onDelete: 'set null',
            onUpdate: 'set null',
            references: {
              model: 'masters',
              key: 'id',
            },
          },
          service_id: {
            type: DataTypes.INTEGER,
            onDelete: 'set null',
            onUpdate: 'set null',
            references: {
              model: 'services',
              key: 'id',
            },
          },
          completed: DataTypes.BOOLEAN,
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
