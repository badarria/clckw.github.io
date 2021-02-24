module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('customers', [{
        name: 'John',
        surname: 'Snow',
        email: 'snowexample@example.com'
      }, {name: 'Aria',
      surname: 'Stark',
      email: 'baklykovadaria@gmail.com',}]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('customers', null, {});
    }
  };