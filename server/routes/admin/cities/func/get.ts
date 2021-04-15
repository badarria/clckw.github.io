import { NextFunction, Request, Response } from 'express'
import { City } from '../../../../db/models'
import { PagingSchema } from '../../../shared/validation'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await PagingSchema.validate(req.params).catch((err: Error) => next(err))
  if (validData) {
    const { limit, order, offset, orderby } = validData
    const params: any = { order: [[orderby, order]] }
    if (limit >= 0) {
      params.limit = limit
      params.offset = offset
    }
    const list = await City.findAndCountAll(params).catch((err: Error) => next(err))
    return list && res.json({ items: list.rows, count: list.count })
  }
}
