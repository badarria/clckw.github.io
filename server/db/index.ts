import { Sequelize } from 'sequelize-typescript'
import { config } from '../../config'
import { City, Customer, Service, Master, Admin, Order } from './models'
const connectionString = config.db

const sequelize = new Sequelize(connectionString, {
  dialectOptions: {
    ssl: true,
  },
})
sequelize.addModels([City, Customer, Service, Master, Admin, Order])

export { sequelize }
