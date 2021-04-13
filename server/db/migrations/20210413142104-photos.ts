import { DataTypes, QueryInterface, } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('photos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      url: {
        type: DataTypes.STRING, allowNull: false
      },
      order_id: {
        type: DataTypes.STRING, allowNull: false,
        onDelete: 'set null',
        onUpdate: 'set null',
        references: {
          model: 'orders',
          key: 'id',
        },
      },
      public_id: {
        type: DataTypes.STRING, allowNull: false
      },
      resource_type: {
        type: DataTypes.STRING, allowNull: false
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.dropTable('photos', { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
};