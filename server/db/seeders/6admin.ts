import { QueryInterface } from 'sequelize/types'
import bcrypt from 'bcrypt'
import uuid from 'uuid'

const pass = process.env.ADMIN_PASSWORD
const login = process.env.ADMIN_LOGIN
const saltRound = 10
const salt = bcrypt.genSaltSync(saltRound)
const cryptPass = bcrypt.hashSync(pass, salt)

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('admin', [
      {
        id: uuid.v4(),
        name: login,
        password: cryptPass,
      },
    ])
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('admin', {})
  },
}
