module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.createTable('admin', {
          id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
          },
          name: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          password: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
        })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.dropTable('admin', { transaction: t })
      })
    } catch (e) {
      console.error(e.message)
    }
  },
}
