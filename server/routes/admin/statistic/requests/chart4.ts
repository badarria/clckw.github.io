import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { sequelize } from '../../../../db'
import { Op, QueryTypes } from 'sequelize'
import { Master, Order, Service } from '../../../../db/models'

const schema = yup.object().shape({
  begin: yup.string().required(),
  finish: yup.string().required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.params).catch((err) => next(err))
  if (!validData) return

  const { begin, finish } = validData
  const list = await sequelize
    .query(
      `WITH allrating AS (
        select round(avg(o.rating) filter (where o.rating > 0))::integer as rating, o.master_id as id from orders o group by (o.master_id)),
        bytypes AS (
          select id, jsonb_agg(jsonb_build_object(type,  total)) as types from (select o.master_id as id, s.name as type, count(*) as total from orders o left join services s on s.id=o.service_id  WHERE o.beginat BETWEEN ${begin}::date AND ${finish}::date group by (s.name, o.master_id)) types group by (id))

        SELECT bt.types, m.name || ' ' || m.surname as master, m.id, COUNT(*)::integer, (count(o.completed) filter (where o.completed is true))::integer as iscompleted, (count(o.completed) filter (where o.completed is false))::integer as isnotcompleted, (sum(s.price) filter (where o.completed is true))::integer as price, ar.rating as rating
            FROM orders o LEFT JOIN masters m on m.id=o.master_id
            LEFT JOIN services s on o.service_id=s.id
            LEFT JOIN allrating ar ON ar.id=o.master_id
            LEFT JOIN bytypes bt on bt.id=o.master_id
            WHERE o.beginat BETWEEN ${begin}::date
            AND ${finish}::date AND m.id IS NOT NULL
            GROUP BY (m.id, ar.rating, bt.types)`,
      { type: QueryTypes.SELECT }
    )
    .catch((err: Error) => next(err))
  if (!list) return

  res.json(list)
}
