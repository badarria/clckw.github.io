import { jwtDecode } from '../../shared/utils/jwtGenerator'
import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { Customer, Order } from '../../../db/models'

const schema = yup.object().shape({
  id: yup.string().required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.params).catch((err) => next(err))
  if (!validData) return

  const { id } = validData
  const orderId = jwtDecode(id)
  if (orderId instanceof Error || !orderId) return next(orderId)

  const order = await Order.findAll({
    attributes: ['id', 'customer', 'rating'],
    where: { id: orderId },
    include: { model: Customer, as: 'c', attributes: ['name', 'surname', 'fullName'] },
  }).catch((err) => next(err))
  res.json(order)
}
