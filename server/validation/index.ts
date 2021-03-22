import * as yup from 'yup'
import { checkThisDayTime, compareTime } from '../utils/datetimefunc'

const name = yup
  .string()
  .matches(/^[a-z -]+$/gi)
  .min(2)
  .max(20)
  .required()
const num = yup.string().matches(/\d+/g)

const orderSchema = yup.object().shape({
  service: yup.string().matches(/[1-8]/g).required(),
  begin: yup
    .string()
    .required()
    .test('this day', (value) => checkThisDayTime(value as string)),
  finish: yup
    .string()
    .required()
    .test('day end', (value, context) => {
      const begin = context.parent.begin
      return compareTime(begin, value as string)
    }),
  customer: num.required(),
  master: num.required(),
})

const customerSchema = yup.object().shape({
  id: num,
  name: name,
  surname: name,
  email: yup.string().email().required(),
})

const serviceSchema = yup.object().shape({
  id: num,
  name: name,
  time: yup.string().matches(/[1-8]/g).required(),
})

const citySchema = yup.object().shape({
  id: num,
  name: name,
})

const masterSchema = yup.object().shape({
  id: num,
  name: name,
  surname: name,
  city: num.required(),
})

const pagingSchema = yup.object().shape({
  limit: yup.number().required(),
  order: yup.string().required(),
  offset: yup.number().required(),
  orderby: yup.string().required(),
})

const deleteSchema = yup.object().shape({
  id: yup.number().required(),
})

const searchParamsSchema = yup.object().shape({
  master_id: yup.number().required(),
  date: yup.string().required(),
  order_id: yup.number().required(),
})

const loginFormSchema = yup.object().shape({
  name: name,
  password: yup.string().trim().min(5).required(),
})

const freeMastersSchema = yup.object().shape({
  city: yup.number().required(),
  begin: yup.string().required(),
  finish: yup.string().required(),
})

const orderIdSchema = yup.object().shape({
  id: yup.string().required(),
})

const orderRatingSchema = yup.object().shape({
  orderId: yup.number().required(),
  rating: yup.number().required(),
})

const secondMailSchema = yup.object().shape({
  userEmail: yup.string().email().required(),
  name: yup.string().required(),
  id: yup.string().required(),
})
const firstMailSchema = yup.object().shape({
  userEmail: yup.string().email().required(),
  name: yup.string().required(),
  begin: yup.string().required(),
  city: yup.string().required(),
  service: yup.string().required(),
  master: yup.string().required(),
})
const mastersOrderSchema =
  yup.object().shape({
    id: yup.number().required(),
  }) && pagingSchema

export {
  orderRatingSchema,
  orderIdSchema,
  freeMastersSchema,
  loginFormSchema,
  searchParamsSchema,
  deleteSchema,
  pagingSchema,
  masterSchema,
  citySchema,
  serviceSchema,
  customerSchema,
  orderSchema,
  firstMailSchema,
  secondMailSchema,
  mastersOrderSchema,
}
