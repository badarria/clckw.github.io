import { Request, Response, NextFunction } from 'express'
import { Order } from '../../../db/models'
import * as yup from 'yup'

const schema = yup.object().shape({
  id: yup.number().required(),
  rating: yup.number().required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.body).catch((err: Error) => next(err))
  if (!validData) return

  const { rating, id } = validData
  const result = await Order.update({ rating }, { where: { id: id }, returning: true }).catch((err: Error) => next(err))
  if (!result) return

  const msg = result[1][0]?.id
  res.json({ msg })
}
