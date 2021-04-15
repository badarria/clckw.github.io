import { NextFunction, Request, Response } from 'express'
import { RemoveSchema } from '../../../shared/validation'
import { Service } from '../../../../db/models'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await RemoveSchema.validate(req.params).catch((err: Error) => next(err))

  if (validData) {
    const { id } = validData
    const result = await Service.destroy({ where: { id } }).catch((err: Error) => next(err))
    if (typeof result === 'number') {
      const msg = result ? 'Service was removed from database' : 'Service not found'
      const type = result ? 'success' : 'warning'
      return res.json({ type, msg })
    }
  }
}
