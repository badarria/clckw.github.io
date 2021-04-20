import { PagingSchema } from '../../shared/validation'
import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { sequelize } from '../../../db'
import { QueryTypes } from 'sequelize'
import { toDate, toTime } from '../../shared/utils/datetimefunc'
import { Order } from '../../../db/models'

const schema = yup.object().shape({ id: yup.number().required() }) && PagingSchema

type Result = {
  id: number
  beginat: string
  begin?: string
  finish?: string
  date?: string
  finishat: string
  completed: boolean
  rating: number | null
  email: string
  photos: boolean
  customer: string
  service: string
  price: number
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.params).catch((err: Error) => next(err))
  if (!validData) return

  const { id, orderby, order, limit, offset } = validData
  let newLimit = `${limit}`,
    newOrderBy = orderby
  if (limit <= 0) newLimit = 'all'
  if (orderby === 'date' || orderby === 'begin') newOrderBy = 'beginat'
  if (orderby === 'finish') newOrderBy = 'finishat'

  const list: any = await sequelize
    .query(
      `select o.id, o.beginat, o.finishat, o.completed, o.rating, u.email as email, c.name||' '||c.surname as customer, count(p.id) as photos, s.name as service, s.price from orders o left join masters m on m.id=o.master_id left join customers c on c.id=o.customer_id left join users u on u.id=c.user_id left join services s on s.id=o.service_id left join photos p on p.order_id=o.id where m.id=${id} group by o.id, c.name, c.surname, s.name, u.email, m.name, m.surname, s.price order by ${newOrderBy} ${order} limit ${newLimit} offset ${offset}`,
      { type: QueryTypes.SELECT }
    )
    .catch((err: Error) => next(err))
  if (!list) return

  const newList: Result[] = list.map((item: Result) => {
    const { beginat, finishat, photos } = item
    const date = toDate(beginat)
    const begin = toTime(beginat)
    const finish = toTime(finishat)
    const photo = !!Number(photos)
    return { ...item, begin, finish, date, photos: photo }
  })
  let count = await Order.count({ where: { master_id: id } }).catch((err) => next(err))
  if (!count) count = 0

  res.json({ list: newList, count })
}
