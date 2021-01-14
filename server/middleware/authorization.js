const { jwtDecode } = require('../utils/jwtGenerator')

module.exports = async (req, res, next) => {
  try {
    const { token } = req.params
    req.body = jwtDecode(token)
    next()
  } catch (err) {
    console.error(err.message)
    return res.status(403).json('Not Authorize')
  }
}
