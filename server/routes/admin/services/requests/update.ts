import { ServiceSchema } from '../../../shared/validation'
import { NextFunction, Request, Response } from 'express'
import { Service } from '../../../../db/models'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await ServiceSchema.validate(req.body).catch((err: Error) => next(err))
  if (!validData) return

  const { name, time, id, price } = validData
  const result = await Service.update({ name, time, price }, { where: { id } }).catch((err: Error) => next(err))
  if (result) {
    const msg = result[0] ? 'Service  was updated' : 'Service not found'
    const type = result[0] ? 'success' : 'warning'
    return res.json({ type, msg })
  }
}
