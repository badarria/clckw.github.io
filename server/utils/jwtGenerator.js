const jwt = require('jsonwebtoken')
const config = require('../../config')

const jwtGenerator = (id) => {
  const payload = {
    user: id,
  }
  return jwt.sign(payload, config.jwt)
}

module.exports = jwtGenerator
