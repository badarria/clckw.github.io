import * as yup from 'yup'
const schema = {}

const name = yup
  .string()
  .matches(/^[a-z -]+$/gi, 'Incorrect symbols')
  .min(2, 'At least 2 characters')
  .max(20, 'Max 20 characters')
  .required()

schema.form = yup.object().shape({
  city: yup.object().shape({
    id: yup.number().required(),
    name: yup.string().trim().required(),
  }),
  service: yup.object().shape({
    id: yup.number().required(),
    name: yup.string().trim().required(),
    time: yup.number().min(1, 'At least 1 hour').max(8, 'Not over than 8 hours').required(),
  }),
  date: yup.date().required(),
  hours: yup
    .string()
    .matches(/(0[89]|1[0-9]):00/)
    .required(),
  name: name,
  surname: name,
  email: yup.string().email('Enter correct email').required(),
})

schema.loginForm = yup.object().shape({
  name: name,
  password: yup.string().min(5, 'Min 5 symbols').required(),
})

export { schema }
