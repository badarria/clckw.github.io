const { jwtDecode } = require('./jwtGenerator')
const { Admin } = require('../db/models')

const checkToken = () => async (req, res, next) => {
  try {
    const { token } = req.headers
    const uuid = jwtDecode(token)
    const user = await Admin.findAll({ where: { id: uuid } })

    if (user[0].id === uuid) {
      next()
    } else return res.status(403).json('Not Authorize')
  } catch (err) {
    console.error(err.message)
    return res.status(403).json('Not Authorize')
  }
}

module.exports = { checkToken }
