import { Sequelize } from 'sequelize-typescript'
import { config } from '../../config'
import { City, Customer, Service, Master, Admin, Order } from './models'
const connectionString = config.db

const sequelize = new Sequelize(connectionString, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})
sequelize.addModels([City, Customer, Service, Master, Admin, Order])

export { sequelize }
