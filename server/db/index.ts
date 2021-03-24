import { Sequelize } from 'sequelize-typescript'
import { config } from '../../config'
import { City, Customer, Service, Master, User, Order } from './models'
const connectionString = config.db
let seqconnetOpt: any = [connectionString]
if ('dbOpt' in config) {
  seqconnetOpt.push(config.dbOpt)
}

const sequelize = new Sequelize(...seqconnetOpt)
sequelize.addModels([City, Customer, Service, Master, Order, User])

// sequelize.sync({ alter: true })
export { sequelize }
