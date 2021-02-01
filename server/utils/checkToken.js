const { jwtDecode } = require('./jwtGenerator')
const pool = require('../db')

const checkToken = (params = 'params') => async (req, res, next) => {
  try {
    const { token } = req[params]
    const uuid = jwtDecode(token)
    const user = await pool.query(`SELECT id FROM admin WHERE id = $1`, uuid)
    if (user[0].id === uuid) {
      next()
    } else return res.status(403).json('Not Authorize')
  } catch (err) {
    console.error(err.message)
    return res.status(403).json('Not Authorize')
  }
}

module.exports = { checkToken }
