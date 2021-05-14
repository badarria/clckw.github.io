import { NextFunction, Request, Response } from 'express'
import { City, Master } from '../../../../db/models'

export default async (req: Request, res: Response, next: NextFunction) => {
  const list = await Master.findAll({
    attributes: ['name', 'surname', ['id', 'master_id'], 'city', 'city_id', 'fullName'],
    include: { model: City, as: 'ci' },
  }).catch((err: Error) => next(err))
  if (!list) return

  res.json(list)
}
