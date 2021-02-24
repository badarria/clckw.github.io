module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('services', [{
        name: 'Small Clock',
        time: '1'
        }, { name: 'Middle Clock',
        time: '2'},
        { name: 'Big Clock',
        time: '3'}]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('services', null, {});
    }
  }; 