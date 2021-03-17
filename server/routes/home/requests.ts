import { toObjFromStr, toObjFromJSDate } from '../../utils/datetimefunc'
import bcrypt from 'bcrypt'
import { jwtGenerator } from '../../utils/jwtGenerator'
import { config } from '../../../config'
import { City, Service, Order, Master, Customer, Admin } from '../../db/models'
import { jwtDecode } from '../../utils/jwtGenerator'
import { NextFunction, Request, Response } from 'express'
import {
  customerSchema,
  orderSchema,
  freeMastersSchema,
  loginFormSchema,
  firstMailSchema,
  secondMailSchema,
} from '../../validation'
import { createMail } from '../../utils'
import { sequelize } from '../../db'
import { error } from 'node:console'
const url = config.mailing.baseUrl
// const { City, Service, Order, Master, Customer, Admin } = sequelize.models

type InitState = { city: typeof City[]; service: typeof Service[] }
type FreeMasters = { id: number; surname: string; name: string; rating: number }[]
type newOrder = { type: string; id: number; msg: string }
type ConfirmMailType = { userEmail: string; name: string; begin: string; city: string; service: string; master: string }
type DataForRatingRequest = { userEmail: string; name: string; orderId: string }
type MailType = {
  body: {
    name: string
    intro: string
    table: {
      data: {
        'Order date': string
        City: string
        'Your master': string
        'Size of clock': string
      }[]
    }
    outro: string
  }
}

const getInitState = async (req: Request, res: Response) => {
  const city = await sequelize.models.City.findAll().catch((err) => new Error(err.message))
  const service = await sequelize.models.Service.findAll().catch((err) => new Error(err.message))

  return city && service && res.json({ city, service })
}

const findMasters = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await freeMastersSchema.validate(req.params).catch((err) => next(err))

  if (validData) {
    const { city, begin, finish } = validData

    const list = await Master.findAll({
      attributes: ['rating', 'name', 'surname', 'id'],
      include: [
        { model: City, as: 'ci', where: { id: city } },
        {
          model: Order,
          as: 'o',
          required: false,
          attributes: ['rating', 'beginat', 'finishat'],
        },
      ],
    }).catch((err) => next(new Error(err)))

    if (Array.isArray(list)) {
      const result: { id: number; surname: string; name: string; rating: number }[] = []
      list.forEach(({ rating, name, surname, id, o }) => {
        let reqBegin = toObjFromStr(begin),
          reqFinish = toObjFromStr(finish)

        const ordersOutRange = o.reduce((acc, { beginat, finishat }) => {
          if (reqFinish <= toObjFromJSDate(beginat) || reqBegin >= toObjFromJSDate(finishat)) {
            acc += 1
          }
          return acc
        }, 0)

        if (ordersOutRange === o.length) {
          result.push({ id, surname, name, rating })
        }
      })
      res.json(result)
    }
  }
}

const upsertCustomer = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await customerSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { email, name, surname } = validData
    const id = await Customer.findOrCreate({ where: { email }, defaults: { name, surname, email } }).catch((err) =>
      next(err)
    )
    return id && res.json(id[0].id)
  }
}

const addNewOrder = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await orderSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { master, customer, service, begin, finish } = validData
    const id = await Order.create({
      master_id: master,
      customer_id: customer,
      service_id: service,
      beginat: begin,
      finishat: finish,
    }).catch((err) => next(err))
    id &&
      res.json({
        type: 'success',
        id: id.id,
        msg: 'Your order is accepted. We will send you a mail with details',
      })
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await loginFormSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { name, password } = validData
    const user = await Admin.findAll({ where: { name } }).catch((err) => next(err))

    if (user) {
      if (user.length === 0) {
        res.json('Password or name is incorrect')
      }
      const isValidPassword = await bcrypt.compare(password, user[0].password).catch((err) => next(err))
      if (isValidPassword) {
        const token = jwtGenerator(user[0].id)
        res.json({ token })
      }
    }
  }
}

const confirmingMail = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await firstMailSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { userEmail, name, begin, city, service, master } = validData
    const mail = {
      body: {
        name,
        intro: 'Your order details:',
        table: {
          data: [{ 'Order date': begin, City: city, 'Your master': master, 'Size of clock': service }],
        },
        outro: 'Thanks for choosing us!',
      },
    }
    const subj = 'Your order has been processed successfully'
    req.body = createMail(mail, userEmail, subj)
    next()
  }
}

const ratingRequestMail = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await secondMailSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { userEmail, name, orderId } = validData
    const tokenId = jwtGenerator(orderId)
    const mail = {
      body: {
        title: `Hi, ${name}! We need your feedback`,
        action: {
          instructions: "Please, follow the link below to rate the master's work",
          button: {
            color: '#3f51b5',
            text: 'Go to Rating',
            link: `${url}/orderRate/${tokenId}`,
          },
        },
        outro: 'Thanks for choosing us!',
      },
    }
    const subj = 'We need your feedback!'
    req.body = createMail(mail, userEmail, subj)
    next()
  }
}

// const newAdminPassword = async (req, res) => {
//   const { name, password } = req.body
//   const saltRound = 10
//   const salt = await bcrypt.genSalt(saltRound)
//   const bcryptPassword = await bcrypt.hash(password, salt)
//   const newUser = await pool.query('INSERT INTO admin (name, password) VALUES ($1, $2) RETURNING *', [
//     name,
//     bcryptPassword,
//   ])
//   const token = jwtGenerator(newUser.rows[0].id)
//   return res.json({ token })
// }

const stayAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers
  if (typeof token === 'string') {
    const uuid = jwtDecode(token)
    if (uuid instanceof Error) next(uuid)
    if (typeof uuid === 'string') {
      const user = await Admin.findAll({ where: { id: uuid } }).catch((err) => next(err))
      if (user && user[0].id === uuid) {
        return res.json(true)
      }
    }
  } else return res.json(false)
}

export { findMasters, upsertCustomer, auth, addNewOrder, stayAuth, confirmingMail, ratingRequestMail, getInitState }
