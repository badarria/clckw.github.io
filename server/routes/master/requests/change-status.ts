import { Order } from '../../../db/models'
import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'

const schema = yup.object().shape({
  id: yup.number().required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.body).catch((err: Error) => next(err))
  if (!validData) return

  const { id } = validData
  const result = await Order.update({ completed: true }, { where: { id } }).catch((err) => next(err))
  if (!result) return

  const msg = result[0] ? 'Order  was updated' : 'Order not found'
  const type = result[0] ? 'success' : 'warning'
  return res.json({ type, msg })
}
