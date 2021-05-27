import { NextFunction, Request, Response } from 'express'
import { PagingSchema } from '../../../shared/validation'
import { Order, Customer, Master, Service, City, User } from '../../../../db/models'
import * as yup from 'yup'
import { Op, Sequelize } from 'sequelize'

type Ord =
  | [string, string]
  | [{ model: typeof Master | typeof Customer | typeof Service; as: string }, string, string]
  | [{ model: typeof Master; as: string }, { model: typeof City; as: string }, string, string]

type Params = { order: [Ord]; limit?: number; offset?: number }

const schema =
  PagingSchema &&
  yup.object().shape({
    masters: yup.array().of(yup.number()),
    cities: yup.array().of(yup.number()),
    services: yup.array().of(yup.number()),
    completed: yup.array().of(yup.boolean()),
    begin: yup.string(),
    finish: yup.string(),
  })

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(JSON.parse(JSON.stringify(req.query))).catch((err: Error) => next(err))
  if (!validData) return

  const { orderby, order, limit, offset } = validData
  const { masters, cities = [], services, begin = '', finish = '', completed } = validData

  console.log(validData, req.query)
  let ord: Ord = [orderby, order]
  if (orderby === 'master') ord = [{ model: Master, as: 'm' }, 'name', order]
  if (orderby === 'customer') ord = [{ model: Customer, as: 'c' }, 'name', order]
  if (orderby === 'city') ord = [{ model: Master, as: 'm' }, { model: City, as: 'ci' }, 'name', order]
  if (orderby === 'service') ord = [{ model: Service, as: 's' }, 'name', order]
  if (orderby === 'price') ord = [{ model: Service, as: 's' }, 'price', order]
  if (orderby === 'date' || orderby === 'begin') ord = ['beginat', order]
  if (orderby === 'finish') ord = ['finishat', order]
  if (orderby === 'status') ord = ['completed', order]

  const params: Params = { order: [ord] }
  if (limit >= 0) {
    params.limit = limit
    params.offset = offset
  }
  const where = []

  if (masters?.length) where.push({ master_id: masters })
  if (services?.length) where.push({ service_id: services })
  if (begin && finish)
    where.push({ beginat: { [Op.between]: [Sequelize.cast(begin, 'date'), Sequelize.cast(finish, 'date')] } })
  if (begin && !finish) where.push({ beginat: { [Op.gte]: Sequelize.cast(begin, 'date') } })
  if (finish && !begin) where.push({ beginat: { [Op.lte]: Sequelize.cast(finish, 'date') } })
  if (completed) where.push({ completed })

  const clause = { where: {} }
  if (where.length > 1) clause.where = where
  if (where.length === 1) clause.where = where[0]

  const cityClause = { where: {} }
  if (cities?.length) cityClause.where = { id: cities }

  let list = await Order.findAndCountAll({
    include: [
      {
        model: Master,
        as: 'm',
        include: [
          { model: City, as: 'ci', ...cityClause, attributes: [['name', 'city'], 'id'] },
          { model: User, as: 'user' },
        ],
        required: true,
      },
      { model: Customer, as: 'c', include: [{ model: User, as: 'user' }] },
      { model: Service, as: 's', attributes: ['id', ['name', 'service'], ['time', 'service_time'], 'price'] },
    ],
    ...clause,
    ...params,
  }).catch((err: Error) => next(err))
  if (!list) return

  const { rows, count } = list
  return res.json({ items: rows, count })
}
