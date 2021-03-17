import { Request, Response, NextFunction } from 'express'
import { jwtDecode } from '../../utils/jwtGenerator'
import { Order, Customer } from '../../db/models'
import { orderIdSchema, orderRatingSchema } from '../../validation'

const getOrderToRate = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await orderIdSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { orderId } = validData
    const id = jwtDecode(orderId)
    if (id instanceof Error) next(id)
    if (typeof id === 'string') {
      const order = await Order.findAll({
        attributes: ['id', 'customer', 'rating'],
        where: { id },
        include: { model: Customer, as: 'c', attributes: ['name', 'surname', 'fullName'] },
      }).catch((err) => next(err))
      res.json(order)
    }
  }
}

const setOrderRating = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await orderRatingSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { rating, orderId } = validData
    const result = await Order.update({ rating }, { where: { id: orderId }, returning: true }).catch((err) => next(err))
    if (result) {
      const msg = result[1][0]?.id
      res.json({ msg })
    }
  }
}

export { getOrderToRate, setOrderRating }
