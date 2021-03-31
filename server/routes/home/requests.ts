import { toObjFromStr, toObjFromJSDate } from '../../utils/datetimefunc'
import bcrypt from 'bcrypt'
import * as genPass from 'generate-password'
import { config } from '../../../config'
import { City, Service, Order, Master, Customer, User, Photo } from '../../db/models'
import { NextFunction, Request, Response } from 'express'
import { customerSchema, orderSchema, freeMastersSchema, loginFormSchema, firstMailSchema } from '../../validation'
import { createMail, cloudinary } from '../../utils'
import { sequelize } from '../../db'

const url = config.mailing.baseUrl
const admin = sequelize.models.Customer
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
      const result: { id: number; surname: string; name: string; rating: number | string }[] = []
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
    const existUser = await User.findOne({ where: { email } }).catch((err) => next(err))
    if (existUser && 'id' in existUser) {
      const { id } = existUser
      const updCustomer = await Customer.update(
        { name, surname },
        { where: { user_id: id }, returning: true }
      ).catch((err) => next(err))
      return updCustomer && res.json({ password: '', id: updCustomer[1][0].id })
    } else {
      let password = genPass.generate({ length: 8, numbers: true })
      const saltRound = 10
      const salt = await bcrypt.genSalt(saltRound)
      const bcPass = await bcrypt.hash(password, salt)
      const token = v4()
      const newUser = await User.create({ token, pass: bcPass, salt, role: 'customer', email })
      const userId = newUser && newUser.id
      const newCustomer = await Customer.create({ name, surname, user_id: userId }).catch((err) => next(err))
      return newCustomer && res.json({ password, id: newCustomer.id })
    }
  }
}

const addNewOrder = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await orderSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { master, customer, service, begin, finish, files = [] } = validData
    console.log(validData)
    const newOrder = await Order.create({
      master_id: master,
      customer_id: customer,
      service_id: service,
      beginat: begin,
      finishat: finish,
    }).catch((err) => next(err))

    if (newOrder) {
      const { id } = newOrder
      let acc = files.length

      const promises = files.map((file) => {
        return cloudinary.v2.uploader
          .upload(file)
          .catch((err) => err)
          .then((cloudData) => {
            if ('url' in cloudData) {
              return Photo.create({
                order_id: id,
                url: cloudData.url,
                public_id: cloudData.public_id,
                resource_type: cloudData.resource_type,
              })
            }
          })
          .then((newOrder) => {
            newOrder && (acc -= 1)
          })
          .catch((err) => next(err))
      })

      return Promise.all(promises).then(() => {
        let msg = acc ? "Order accepted but something went wrong and photo wasn't downloaded." : 'Order accepted.'
        msg += ' We will send you a mail with details'

        id && res.json({ type: 'success', id: newOrder.id, msg })
      })
    }
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await loginFormSchema.validate(req.body).catch((err) => next(err))

  if (validData) {
    const { email, password } = validData
    const user = await User.findOne({ where: { email } }).catch((err) => next(err))
    if (user) {
      const { id, salt, pass, token, role } = user
      const bcryptPassword = await bcrypt.hash(password, salt).catch((err) => next(err))
      const isMatch = bcryptPassword === pass

      if (isMatch) {
        let userId = 0,
          name = 'admin'
        if (role === 'master') {
          const master = await Master.findOne({ include: { model: User, where: { id } } }).catch((err) => next(err))
          master && (userId = master.id) && (name = master.fullName)
        }
        if (role === 'customer') {
          const customer = await Customer.findOne({ include: { model: User, where: { id } } }).catch((err) => next(err))
          customer && (userId = customer.id) && (name = customer.fullName)
        }
        return res.json({ id: userId, role, token, name })
      } else next(new Error('Name or password is incorrect'))
    } else next(new Error('Name or password is incorrect'))
  }
}

const confirmingMail = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await firstMailSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { userEmail, name, begin, city, service, master, password } = validData
    const table: any = [
      {
        title: 'Your order details:',
        data: [{ 'Order date': begin, City: city, 'Your master': master, 'Size of clock': service }],
      },
    ]
    password && table.push({ title: 'Your registration details:', data: [{ Login: userEmail, Password: password }] })

    const mail = {
      body: { name, table, outro: 'Thanks for choosing us!' },
    }
    const subj = 'Your order has been processed successfully'
    req.body = createMail(mail, userEmail, subj)
    next()
  }
}

const regMaster = async (req: Request, res: Response, next: NextFunction) => {
  const { name, surname, city, password, email } = req.body
  const saltRound = 10
  const salt = await bcrypt.genSalt(saltRound)
  const bcPass = await bcrypt.hash(password, salt)
  const userToken = v4()

  const user = await User.create({
    salt,
    pass: bcPass,
    token: userToken,
    email,
    role: 'master',
  }).catch((err) => next(err))
  if (user) {
    const { id } = user
    const newMaster = await Master.create({ name, surname, city_id: city, user_id: id }).catch((err) => next(err))
    return user && newMaster && res.json({ token: userToken, role: 'master', id: newMaster.id, name })
  }
}

const stayAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers

  if (typeof token === 'string') {
    const user = await User.findOne({ where: { token } }).catch((err) => next(err))

    if (user && user.role === 'customer') {
      const customer = await Customer.findOne({ where: { user_id: user.id } }).catch((err) => next(err))
      return customer && res.json({ role: 'customer', id: customer.id, token, name: customer.fullName })
    } else if (user && user.role === 'master') {
      const master = await Master.findOne({ where: { user_id: user.id } }).catch((err) => next(err))
      return master && res.json({ role: 'master', id: master.id, token, name: master.fullName })
    } else return user && res.json({ token: user.token, id: 0, role: 'admin', name: 'admin' })
  } else return res.json(false)
}

export { findMasters, upsertCustomer, auth, addNewOrder, stayAuth, confirmingMail, getInitState, regMaster }
