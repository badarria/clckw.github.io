import { NextFunction, Request, Response } from 'express'
import { City } from '../../../../db/models'
import { CitySchema } from '../../../shared/validation'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await CitySchema.validate(req.body).catch((err: Error) => next(err))
  if (!validData) return

  const { name } = validData
  const result = await City.create({ name }).catch((err: Error) => next(err))
  return result && res.json({ type: 'success', msg: 'City was added' })
}
