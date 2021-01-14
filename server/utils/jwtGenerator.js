const jwt = require('jsonwebtoken')
const config = require('../../config')

const jwtGenerator = (id) => jwt.sign(id, config.jwt)

const jwtDecode = (token) => jwt.verify(token, config.jwt)

module.exports = { jwtGenerator, jwtDecode }
