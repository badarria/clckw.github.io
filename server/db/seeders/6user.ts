import { QueryInterface } from 'sequelize/types'
import bcrypt from 'bcrypt'
import uuid from 'uuid'

const adminPass = process.env.ADMIN_PASSWORD
const adminLogin = process.env.ADMIN_LOGIN
const masterPass = process.env.MASTER_PASSWORD
const masterLogin = process.env.MASTER_LOGIN

const saltRound = 10
const saltGen = () => bcrypt.genSaltSync(saltRound)

const mSalt = saltGen()
const mPass = bcrypt.hashSync(masterPass, mSalt)
const aSalt = saltGen()
const aPass = bcrypt.hashSync(adminPass, aSalt)

export default {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        token: uuid.v4(),
        name: adminLogin,
        password: aPass,
        salt: aSalt,
        role: 'admin',
      },
      {
        token: uuid.v4(),
        name: masterLogin,
        password: mPass,
        salt: mPass,
        role: 'master',
      },
    ])
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete('users', {})
  },
}
