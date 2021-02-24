module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('cities', [
      {
        name: 'Dnipro',
      },
      { name: 'Ujhorod' },
    ]),
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cities', null, {})
  },
}
