import { NextFunction, Request, Response } from 'express'
import { PagingSchema } from '../../../shared/validation'
import { Customer, User } from '../../../../db/models'

type Ord = [string, string] | [{ model: typeof User; as: string }, string, string]
type Params = { order: [Ord]; limit?: number; offset?: number }

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await PagingSchema.validate(req.params).catch((err: Error) => next(err))
  if (!validData) return

  const { orderby, order, limit, offset } = validData
  let ord: Ord = [orderby, order]
  if (orderby === 'email') {
    ord = [{ model: User, as: 'user' }, 'email', order]
  }
  const params: Params = { order: [ord] }
  if (limit >= 0) {
    params.limit = limit
    params.offset = offset
  }
  const list = await Customer.findAndCountAll({
    ...params,
    include: { model: User, as: 'user' },
  }).catch((err: Error) => next(err))

  return list && res.json({ items: list.rows, count: list.count })
}
