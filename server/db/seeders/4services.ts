import { QueryInterface } from 'sequelize/types'
export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('services', [
      {
        name: 'Small Clock',
        time: '1',
      },
      { name: 'Middle Clock', time: '2' },
      { name: 'Big Clock', time: '3' },
    ])
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('services', {})
  },
}
