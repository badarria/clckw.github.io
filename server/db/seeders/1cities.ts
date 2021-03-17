import { QueryInterface } from 'sequelize/types'
export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.bulkInsert('cities', [
      {
        name: 'Dnipro',
      },
      { name: 'Ujhorod' },
    ]),
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('cities', {})
  },
}
