import { QueryInterface } from 'sequelize/types'
export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('masters', [
      {
        name: 'Stannis',
        surname: 'Baratheon',
        city_id: 1,
      },
      { name: 'Eddard', surname: 'Stark', city_id: 2 },
    ])
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('masters', {})
  },
}
