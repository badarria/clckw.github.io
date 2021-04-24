import { Sequelize } from 'sequelize-typescript'
import { config } from '../../config'
import { City, Customer, Service, Master, User, Order, Photo, Post } from './models'
const connectionString = config.db
type Config = [
  string,
  {
    dialectOptions?: {
      ssl?: {
        require?: boolean
        rejectUnauthorized?: boolean
      }
    }
  }?
]

let seqconnetOpt: Config = [connectionString]
if ('dbOpt' in config) {
  seqconnetOpt.push(config.dbOpt)
}

const sequelize = new Sequelize(...seqconnetOpt)
sequelize.addModels([City, Customer, Service, Master, Order, User, Photo, Post])

// Service.sync({ alter: true })
export { sequelize }
