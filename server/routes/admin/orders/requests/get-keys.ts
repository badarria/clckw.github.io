import { NextFunction, Request, Response } from 'express'
import { Customer, Master, Service } from '../../../../db/models'

export default async (req: Request, res: Response, next: NextFunction) => {
  const master = await Master.findAll().catch((err: Error) => next(err))
  const customer = await Customer.findAll().catch((err: Error) => next(err))
  const service = await Service.findAll({
    attributes: ['id', ['name', 'service'], ['time', 'service_time']],
  }).catch((err: Error) => next(err))

  return master && customer && service && res.json({ master, customer, service })
}
