import { NextFunction, Request, Response } from 'express'
import { City, Master, Service } from '../../../../db/models'

export default async (req: Request, res: Response, next: NextFunction) => {
  const masters = await Master.findAll().catch((err: Error) => next(err))
  const cities = await City.findAll().catch((err: Error) => next(err))
  const services = await Service.findAll().catch((err: Error) => next(err))

  return masters && cities && services && res.json({ masters, cities, services })
}
