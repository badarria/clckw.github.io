import { QueryInterface } from 'sequelize/types'
export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('customers', [
      {
        name: 'John',
        surname: 'Snow',
        email: 'snowexample@example.com',
      },
      { name: 'Aria', surname: 'Stark', email: 'baklykovadaria@gmail.com' },
    ])
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('customers', {})
  },
}
