import { QueryInterface } from 'sequelize/types'
export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('orders', [
      {
        service_id: 1,
        customer_id: 1,
        master_id: 1,
        beginat: '30-03-2021T13:00:00',
        finishat: '30-03-2021T14:00:00',
      },
    ])
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('orders', {})
  },
}
