import * as yup from 'yup'

const name = yup
  .string()
  .matches(/^[a-z -]+$/gi, 'Incorrect symbols')
  .min(2, 'At least 2 characters')
  .max(20, 'Max 20 characters')
  .required()
const num = yup.string().matches(/\d+/g, 'Have to be a number')

export const orders = yup.object().shape({
  service: yup.object().shape({
    // id: num.required(),
    service_time: yup.string().matches(/[1-8]/g, 'From 1 to 8 hours').required(),
  }),
  date: yup.date().required(),
  hours: yup
    .string()
    .matches(/(0[89]|1[0-9]):00/)
    .required(),
  customer: yup.object().shape({
    id: num.required(),
  }),
  master: yup.object().shape({
    id: num.required(),
  }),
})

export const customers = yup.object().shape({
  id: num,
  name: name,
  surname: name,
  email: yup.string().email('Enter correct email').required(),
})

export const services = yup.object().shape({
  id: num,
  name: name,
  time: yup.object().shape({
    id: yup.number().required(),
    name: yup
      .string()
      .matches(/^[1-8]h$/, 'From 1 to 8 hours')
      .required(),
  }),
})

export const cities = yup.object().shape({
  id: num,
  name: name,
})

export const masters = yup.object().shape({
  id: num,
  name: name,
  surname: name,
  city: yup.object().shape({
    id: num.required(),
  }),
  password: yup.string().required(),
  email: yup.string().email().required(),
})
