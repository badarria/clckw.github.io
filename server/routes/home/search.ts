import { toObjFromStr, toObjFromJSDate } from '../../utils/datetimefunc'
import bcrypt from 'bcrypt'
import * as genPass from 'generate-password'
import { City, Service, Order, Master, Customer, User, Photo } from '../../db/models'
import { NextFunction, Request, Response } from 'express'
import { customerSchema, orderSchema, freeMastersSchema } from '../../validation'
import { cloudinary } from '../../utils'
import { sequelize } from '../../db'

const admin = sequelize.models.Customer
import { v4 } from 'uuid'

export const getInitState = async (req: Request, res: Response) => {
  const city = await City.findAll().catch((err) => new Error(err.message))
  const service = await Service.findAll().catch((err) => new Error(err.message))

  return city && service && res.json({ city, service })
}

export const findMasters = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await freeMastersSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { city, begin, finish } = validData

    const list = await Master.findAll({
      // attributes: ['rating', 'name', 'surname', 'id', 'fullName'],
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

export const upsertCustomer = async (req: Request, res: Response, next: NextFunction) => {
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
      const newUser = await User.create({ token, pass: bcPass, salt, role: 'customer', email }).catch((err) =>
        next(err)
      )
      const userId = newUser && newUser.id
      const newCustomer = await Customer.create({ name, surname, user_id: userId }).catch((err) => next(err))
      return newCustomer && res.json({ password, id: newCustomer.id })
    }
  }
}

export const addNewOrder = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await orderSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { master, customer, service, begin, finish, files = [] } = validData
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
              const { url, public_id, resource_type } = cloudData
              return Photo.create({
                order_id: id,
                url,
                public_id,
                resource_type,
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
