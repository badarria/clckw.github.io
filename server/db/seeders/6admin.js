const bcrypt = require('bcrypt')
const uuid = require('uuid')

const pass = process.env.ADMIN_PASSWORD
const login = process.env.ADMIN_LOGIN
const saltRound = 10
const salt = bcrypt.genSaltSync(saltRound)
const cryptPass = bcrypt.hashSync(pass, salt)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('admin', [
      {
        id: uuid.v4(),
        name: login,
        password: cryptPass,
      },
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admin', null, {})
  },
}
