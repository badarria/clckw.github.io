module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('masters', [{
        name: 'Stannis',
        surname: 'Baratheon',
        city_id: 1
      }, {name: 'Eddard',
      surname: 'Stark',
      city_id: 2,}]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('masters', null, {});
    }
  }; 