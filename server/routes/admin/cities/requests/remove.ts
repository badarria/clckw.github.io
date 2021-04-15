import { NextFunction, Request, Response } from 'express'
import { City } from '../../../../db/models'
import { RemoveSchema } from '../../../shared/validation'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await RemoveSchema.validate(req.params).catch((err: Error) => next(err))
  if (!validData) return

  const { id } = validData
  const city = await City.destroy({ where: { id } }).catch((err: Error) => next(err))
  if (!city) return res.json({ type: 'warning', msg: 'City not found' })

  const msg = 'City was removed from database'
  const type = 'success'
  return res.json({ type, msg })
}
