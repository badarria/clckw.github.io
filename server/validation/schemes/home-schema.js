const { DateTime } = require('luxon')
const yup = require('yup')

const checkThisDayTime = (date) => {
  const now = DateTime.local()
  const begin = DateTime.fromISO(date)
  return begin >= now
}
const compareTime = (begin, end) => {
  const endOfDay = DateTime.fromISO(begin).set({ hours: 20, minutes: 0, seconds: 0 })
  const beginDate = DateTime.fromISO(begin)
  const endDate = DateTime.fromISO(end)

  return endOfDay >= endDate && beginDate < endDate
}

const schema = {}
const name = yup
  .string()
  .matches(/^[a-z -]+$/gi)
  .min(2)
  .max(20)
  .required()
const num = yup.string().matches(/\d+/g)

schema.masters = yup.object().shape({
  city: yup.number().required(),
  begin: yup.date().required(),
  end: yup.date().required(),
})

schema.customer = yup.object().shape({
  name: name,
  surname: name,
  email: yup.string().email().required(),
})

schema.loginForm = yup.object().shape({
  name: name,
  password: yup.string().trim().min(5).required(),
})

schema.order = yup.object().shape({
  service: yup.string().matches(/[1-8]/g).required(),
  begin: yup
    .string()
    .required()
    .test('this day', (value) => checkThisDayTime(value)),
  end: yup
    .string()
    .required()
    .test('day end', (value, context) => {
      const begin = context.parent.begin
      return compareTime(begin, value)
    }),
  customer: num.required(),
  master: num.required(),
})

module.exports = schema
