import { toObjFromStr, toObjFromJSDate } from '../../utils/datetimefunc'
import bcrypt from 'bcrypt'
import { config } from '../../../config'
import { City, Service, Order, Master, Customer, Admin, User } from '../../db/models'
import { NextFunction, Request, Response } from 'express'
import { customerSchema, orderSchema, freeMastersSchema, loginFormSchema, firstMailSchema } from '../../validation'
import { createMail } from '../../utils'
import { sequelize } from '../../db'
const url = config.mailing.baseUrl
const admin = sequelize.models.Admin
import { v4 } from 'uuid'

const getInitState = async (req: Request, res: Response) => {
  const city = await City.findAll().catch((err) => new Error(err.message))
  const service = await Service.findAll().catch((err) => new Error(err.message))

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
    const user = await User.findOne({ where: { name } }).catch((err) => next(err))

    if (user) {
      const { salt, pass, token, role, user_id } = user
      const bcryptPassword = await bcrypt.hash(password, salt).catch((err) => next(err))
      const isMatch = bcryptPassword === pass
      isMatch && res.json({ token, role, user_id })
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

// const newUser = async (req: Request, res: Response, next: NextFunction) => {
//   const { name, password } = req.body
//   const saltRound = 10
//   const salt = await bcrypt.genSalt(saltRound)
//   const bcPass = await bcrypt.hash(password, salt)
//   const userToken = v4()
//   console.log(userToken)
//   const user = await User.create({
//     salt,
//     pass: bcPass,
//     token: userToken,
//     name,
//     role: 'master',
//     user_id: 2,
//   }).catch((err) => next(err))
//   return user && res.json({ userToken })
// }

const stayAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers
  console.log()
  if (typeof token === 'string') {
    const user = await User.findOne({ where: { token } }).catch((err) => next(err))
    if (user && user.token === token) {
      return res.json(user)
    }
  } else return res.json(false)
}

export { findMasters, upsertCustomer, auth, addNewOrder, stayAuth, confirmingMail, getInitState }
