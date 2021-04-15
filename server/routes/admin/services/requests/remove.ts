import { NextFunction, Request, Response } from 'express'
import { RemoveSchema } from '../../../shared/validation'
import { Service } from '../../../../db/models'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await RemoveSchema.validate(req.params).catch((err: Error) => next(err))
  if (!validData) return

  const { id } = validData
  const result = await Service.destroy({ where: { id } }).catch((err: Error) => next(err))
  if (!result) return res.json({ type: 'warning', msg: 'Service not found' })
  const msg = 'Service was removed from database'
  const type = 'success'
  return res.json({ type, msg })
}
