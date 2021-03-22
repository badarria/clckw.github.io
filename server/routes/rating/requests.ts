import { Request, Response, NextFunction } from 'express'
import { jwtDecode } from '../../utils/jwtGenerator'
import { Order, Customer } from '../../db/models'
import { orderIdSchema, orderRatingSchema } from '../../validation'

const getOrderToRate = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await orderIdSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { id } = validData
    const orderId = jwtDecode(id)
    if (orderId instanceof Error) next(orderId)
    if (typeof orderId === 'string') {
      const order = await Order.findAll({
        attributes: ['id', 'customer', 'rating'],
        where: { id: orderId },
        include: { model: Customer, as: 'c', attributes: ['name', 'surname', 'fullName'] },
      }).catch((err) => next(err))
      res.json(order)
    }
  }
}

const setOrderRating = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await orderRatingSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { rating, id } = validData
    const result = await Order.update({ rating }, { where: { id: id }, returning: true }).catch((err) => next(err))
    if (result) {
      const msg = result[1][0]?.id
      res.json({ msg })
    }
  }
}

export { getOrderToRate, setOrderRating }
