import { PagingSchema } from '../../../shared/validation'
import { NextFunction, Request, Response } from 'express'
import { Master, City, Order, User } from '../../../../db/models'

type Ord = [string, string] | [{ model: typeof User | typeof City; as: string }, string, string]
type Params = { order: [Ord]; limit?: number; offset?: number }

export default async (req: Request, res: Response, next: NextFunction) => {
  let validData = await PagingSchema.validate(req.params).catch((err: Error) => next(err))
  if (!validData) return

  const { limit, offset, orderby, order } = validData
  let ord: Ord = [orderby, order]
  if (orderby === 'city') {
    ord = [{ model: City, as: 'ci' }, 'name', order]
  }
  if (orderby === 'rating') ord = ['id', order]
  if (orderby === 'email') {
    ord = [{ model: User, as: 'user' }, 'email', order]
  }
  const params: Params = { order: [ord] }
  if (limit >= 0) {
    params.limit = limit
    params.offset = offset
  }

  const count = await Master.count().catch((err: Error) => next(err))
  const items = await Master.findAll({
    attributes: ['id', 'name', 'surname', 'city', 'rating', 'city_id', 'email'],
    ...params,
    include: [
      {
        model: City,
        as: 'ci',
        attributes: ['name', 'id'],
      },
      {
        model: Order,
        as: 'o',
        attributes: ['rating'],
      },
      { model: User, as: 'user' },
    ],
  }).catch((err: Error) => next(err))

  return count && items && res.json({ items, count })
}
