import { NextFunction, Request, Response } from 'express'
import { City } from '../../../../db/models'

export default async (req: Request, res: Response, next: NextFunction) => {
  const city = await City.findAll().catch((err: Error) => next(err))
  return city && res.json(city)
}
