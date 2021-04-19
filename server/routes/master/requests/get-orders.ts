import { PagingSchema } from '../../shared/validation'
import { Customer, Master, Order, Photo, Service, User } from '../../../db/models'
import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'

const schema = yup.object().shape({ id: yup.number().required() }) && PagingSchema

type Ord = [string, string] | [{ model: typeof Customer | typeof Service; as: string }, string, string]
type Params = { order: [Ord]; limit?: number; offset?: number }

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.params).catch((err: Error) => next(err))
  if (!validData) return

  const { id, orderby, order, limit, offset } = validData
  let ord: Ord = [orderby, order]
  if (orderby === 'customer') ord = [{ model: Customer, as: 'c' }, 'name', order]
  if (orderby === 'service') ord = [{ model: Service, as: 's' }, 'name', order]
  if (orderby === 'price') ord = [{ model: Service, as: 's' }, 'price', order]
  if (orderby === 'date' || orderby === 'begin') ord = ['beginat', order]
  if (orderby === 'finish') ord = ['finishat', order]

  const params: Params = { order: [ord] }
  if (limit >= 0) {
    params.limit = limit
    params.offset = offset
  }

  const list = await Order.findAll({
    ...params,
    attributes: ['id', 'date', 'begin', 'finish', 'rating', 'beginat', 'finishat', 'completed', 'price'],
    include: [
      {
        model: Customer,
        as: 'c',
        attributes: ['name', 'surname', 'fullName', 'email'],
        include: [{ model: User, as: 'user' }],
      },
      { model: Master, as: 'm', attributes: ['id', 'name', 'surname', 'fullName'], where: { id } },
      { model: Service, as: 's', attributes: [['name', 'service'], 'price'] },
      { model: Photo, as: 'photos' },
    ],
  }).catch((err: Error) => next(err))
  list && res.json(list)
}
