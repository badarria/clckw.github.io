import { NextFunction, Request, Response } from 'express'
import { PagingSchema } from '../../../shared/validation'
import { Order, Customer, Master, Service, City } from '../../../../db/models'

export default async (req: Request, res: Response, next: NextFunction) => {
  let validData = await PagingSchema.validate(req.params).catch((err: Error) => next(err))
  if (!validData) return

  const { orderby, order, limit, offset } = validData
  let ord: any = [orderby, order]
  if (orderby === 'master') ord = [{ model: Master, as: 'm' }, 'name', order]
  if (orderby === 'customer') ord = [{ model: Customer, as: 'c' }, 'name', order]
  if (orderby === 'city') ord = [{ model: Master, as: 'm' }, { model: City, as: 'ci' }, 'name', order]
  if (orderby === 'service') ord = [{ model: Service, as: 's' }, 'name', order]
  if (orderby === 'price') ord = [{ model: Service, as: 's' }, 'price', order]
  if (orderby === 'date' || orderby === 'begin') ord = ['beginat', order]
  if (orderby === 'finish') ord = ['finishat', order]
  if (orderby === 'status') ord = ['completed', order]

  const params: any = { order: [ord] }
  if (limit >= 0) {
    params.limit = limit
    params.offset = offset
  }
  let list = await Order.scope('allIncl')
    .findAndCountAll(params)
    .catch((err: Error) => next(err))

  return list && res.json({ items: list.rows, count: list.count })
}
