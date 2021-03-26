import { Customer, Master, Order, Service, User } from '../../db/models'
import { NextFunction, Request, Response } from 'express'
import { userRatingSchema, usersOrderSchema } from '../../validation'
import { config } from '../../../config'
import { nextTick } from 'node:process'
const url = config.mailing.baseUrl

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await usersOrderSchema.validate(req.params).catch((err) => next(err))
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
        {
          model: Customer,
          as: 'c',
          attributes: ['name', 'surname', 'fullName', 'email'],
          where: { id },
          include: [{ model: User, as: 'user' }],
        },
        {
          model: Master,
          as: 'm',
          attributes: ['id', 'name', 'surname', 'fullName'],
          include: [{ model: User, as: 'user' }],
        },
        { model: Service, as: 's', attributes: [['name', 'service']] },
      ],
    }).catch((err) => next(err))
    list && res.json(list)
  }
}

export const setRating = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await userRatingSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { id, rating } = validData
    const updRating = await Order.update({ rating }, { where: { id } }).catch((err) => next(err))
    if (updRating) {
      const msg = updRating ? 'Order was rated!' : "Order wasn't found"
      const type = updRating ? 'success' : 'warning'
      return res.json({ type, msg })
    }
  }
}
