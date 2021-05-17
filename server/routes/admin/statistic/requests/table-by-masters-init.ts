import { NextFunction, Request, Response } from 'express'
import { Service } from '../../../../db/models'

export default async (req: Request, res: Response, next: NextFunction) => {
  const list = await Service.findAll({
    attributes: ['name'],
  }).catch((err: Error) => next(err))
  if (!list) return

  res.json(list)
}
