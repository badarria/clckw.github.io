const yup = require('yup')
const { checkThisDayTime, compareTime } = require('../utils/datetimefunc')

const schema = {}
const name = yup
  .string()
  .matches(/^[a-z -]+$/gi)
  .min(2)
  .max(20)
  .required()
const num = yup.string().matches(/\d+/g)

schema.orders = yup.object().shape({
  service: yup.string().matches(/[1-8]/g).required(),
  begin: yup
    .string()
    .required()
    .test('this day', (value) => checkThisDayTime(value)),
  finish: yup
    .string()
    .required()
    .test('day end', (value, context) => {
      const begin = context.parent.begin
      return compareTime(begin, value)
    }),
  customer: num.required(),
  master: num.required(),
})

schema.customers = yup.object().shape({
  id: num,
  name: name,
  surname: name,
  email: yup.string().email().required(),
})

schema.services = yup.object().shape({
  id: num,
  name: name,
  time: yup.string().matches(/[1-8]/g).required(),
})

schema.cities = yup.object().shape({
  id: num,
  name: name,
})

schema.masters = yup.object().shape({
  id: num,
  name: name,
  surname: name,
  city: num.required(),
})

module.exports = schema
