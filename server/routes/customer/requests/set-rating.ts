import { Order } from '../../../db/models'
import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'

const schema = yup.object().shape({
  id: yup.number().required(),
  rating: yup.number().required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.body).catch((err: Error) => next(err))
  if (!validData) return

  const { id, rating } = validData
  const updRating = await Order.update({ rating }, { where: { id } }).catch((err: Error) => next(err))
  if (!updRating) return

  const msg = updRating ? 'Order was rated!' : "Order wasn't found"
  const type = updRating ? 'success' : 'warning'
  return res.json({ type, msg })
}
