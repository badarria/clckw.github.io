import { NextFunction, Request, Response } from 'express'
import { City } from '../../../../db/models'
import { CitySchema } from '../../../shared/validation'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await CitySchema.validate(req.body).catch((err: Error) => next(err))
  if (!validData) return

  const { name, id } = validData
  const result = await City.update({ name }, { where: { id } }).catch((err: Error) => next(err))
  if (!result) return

  const msg = result[0] ? 'City was updated' : 'City not found'
  const type = result[0] ? 'success' : 'warning'
  return res.json({ type, msg })
}
