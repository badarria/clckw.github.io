import { NextFunction, Request, Response } from 'express'
import { City } from '../../../../db/models'
import { RemoveSchema } from '../../../shared/validation'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await RemoveSchema.validate(req.params).catch((err: Error) => next(err))
  if (validData) {
    const { id } = validData
    const result = await City.destroy({ where: { id } }).catch((err: Error) => next(err))
    if (typeof result === 'number') {
      const msg = result ? 'City was removed from database' : 'City not found'
      const type = result ? 'success' : 'warning'
      return res.json({ type, msg })
    }
  }
}
