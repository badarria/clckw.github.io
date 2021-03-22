import { Customer, Master, Order, Service } from '../../db/models'
import { NextFunction, Request, Response } from 'express'
import { mastersOrderSchema, orderIdSchema, secondMailSchema } from '../../validation'
import { createMail, jwtGenerator } from '../../utils'
import { config } from '../../../config'
const url = config.mailing.baseUrl

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await mastersOrderSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { id, orderby, order, limit, offset } = validData
    let ord: any = [orderby, order]
    if (orderby === 'customer') ord = [{ model: Customer, as: 'c' }, 'name', order]
    if (orderby === 'service') ord = [{ model: Service, as: 's' }, 'name', order]
    if (orderby === 'date' || orderby === 'begin') ord = ['beginat', order]
    if (orderby === 'finish') ord = ['finishat', order]

    const params: any = { order: [ord] }
    if (limit >= 0) {
      params.limit = limit
      params.offset = offset
    }

    const list = await Order.findAll({
      ...params,
      attributes: ['id', 'date', 'begin', 'finish', 'rating', 'beginat', 'finishat', 'completed'],
      include: [
        { model: Customer, as: 'c', attributes: ['name', 'surname', 'fullName', 'email'] },
        { model: Master, as: 'm', attributes: ['id', 'name', 'surname', 'fullName'], where: { id } },
        { model: Service, as: 's', attributes: [['name', 'service']] },
      ],
    }).catch((err) => next(err))
    list && res.json(list)
  }
}

export const changeStatus = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await orderIdSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { id } = validData
    const result = await Order.update({ completed: true }, { where: { id } }).catch((err) => next(err))
    if (result) {
      const msg = result[0] ? 'Order was updated' : 'Order not found'
      const type = result[0] ? 'success' : 'warning'
      return res.json({ type, msg })
    }
  }
}

export const ratingRequestMail = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await secondMailSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { userEmail, name, id } = validData
    const token = jwtGenerator(id)
    const mail = {
      body: {
        title: `Hi, ${name}! We need your feedback`,
        action: {
          instructions: "Please, follow the link below to rate the master's work",
          button: {
            color: '#3f51b5',
            text: 'Go to Rating',
            link: `${url}/orderRate/${token}`,
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

export const getResponse = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) res.json({ type: 'warning', msg: "Order was updated, but message with rating request wasn't sent" })
  else res.json({ type: 'success', msg: 'Order was updated and request message was sent' })
  next()
}
