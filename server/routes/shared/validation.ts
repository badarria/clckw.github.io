import { checkThisDayTime, compareTime } from './utils/datetimefunc'
import * as yup from 'yup'

export const name = yup
  .string()
  .matches(/^[a-z -]+$/gi)
  .min(2)
  .max(20)
  .required()
export const num = yup.string().matches(/\d+/g)

export const PagingSchema = yup.object().shape({
  limit: yup.number().required(),
  order: yup.string().required(),
  offset: yup.number().required(),
  orderby: yup.string().required(),
})

export const RemoveSchema = yup.object().shape({
  id: yup.number().required(),
})

export const OrderSchema = yup.object().shape({
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
  files: yup.array(),
})

export const ServiceSchema = yup.object().shape({
  id: num,
  name: name,
  time: yup.string().matches(/[1-8]/g).required(),
  price: yup.number().required(),
})

export const MasterSchema = yup.object().shape({
  id: num,
  name: name,
  surname: name,
  city: num.required(),
  password: yup.string().required(),
  email: yup.string().required(),
})

export const CustomerSchema = yup.object().shape({
  id: num,
  name: name,
  surname: name,
  email: yup.string().email().required(),
})

export const CitySchema = yup.object().shape({
  id: num,
  name: name,
})
