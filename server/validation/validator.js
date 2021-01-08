const yup = require('yup')

const validator = (schema, opt = 'body') => async (req, res, next) => {
  try {
    req.body = await schema.validate(req[opt])
    next()
  } catch (err) {
    console.error(err.message)
    res.status(400).send({ msg: 'Invalid data. Please, try again' })
  }
}

module.exports = validator
