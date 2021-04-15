import { NextFunction, Request, Response } from 'express'
import { PagingSchema } from '../../../shared/validation'
import { Service } from '../../../../db/models'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await PagingSchema.validate(req.params).catch((err: Error) => next(err))

  if (validData) {
    const { orderby, order, limit, offset } = validData
    const params: any = { order: [[orderby, order]] }
    if (limit >= 0) {
      params.limit = limit
      params.offset = offset
    }
    const list = await Service.findAndCountAll(params).catch((err: Error) => next(err))

    return list && res.json({ items: list.rows, count: list.count })
  }
}
