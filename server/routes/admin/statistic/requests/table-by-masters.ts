import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { sequelize } from '../../../../db'
import { QueryTypes } from 'sequelize'
import { PagingSchema } from '../../../shared/validation'
import { Master } from '../../../../db/models'

const schema =
  yup.object().shape({
    begin: yup.string().required(),
    finish: yup.string().required(),
  }) && PagingSchema

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.params).catch((err) => next(err))
  if (!validData) return

  const { begin, finish, offset, limit, order, orderby } = validData

  const list = await sequelize
    .query(
      `WITH allrating AS (
        select round(avg(o.rating) filter (where o.rating > 0))::integer as rating, o.master_id as id from orders o group by (o.master_id)),
        bytypes AS (
          select id, jsonb_agg(jsonb_build_object(type,  total)) as types from (select o.master_id as id, s.name as type, count(*) as total from orders o left join services s on s.id=o.service_id  WHERE o.beginat BETWEEN ${begin}::date AND ${finish}::date group by (s.name, o.master_id)) types group by (id)),
        allOrders AS (
          select COUNT(*)::integer as orders, o.master_id as id, (count(o.completed) filter (where o.completed is true))::integer as iscompleted, (count(o.completed) filter (where o.completed is false))::integer as isnotcompleted, (sum(s.price) filter (where o.completed is true))::integer as price
          FROM orders o LEFT JOIN services s on s.id=o.service_id
          WHERE o.beginat BETWEEN ${begin}::date
          AND ${finish}::date AND o.master_id IS NOT NULL
          GROUP BY (o.master_id)
        )
        SELECT bt.types, m.name || ' ' || m.surname as master, coalesce(ao.orders, 0) as orders, coalesce(ar.rating, 0) as rating,  coalesce(ao.price, 0) as price, coalesce(ao.iscompleted, 0) as iscompleted, coalesce(ao.isnotcompleted, 0) as isnotcompleted
            FROM masters m
            LEFT JOIN allOrders ao on m.id=ao.id
            LEFT JOIN allrating ar ON ar.id=ao.id
            LEFT JOIN bytypes bt on bt.id=ao.id
            
            GROUP BY (m.id, ar.rating, bt.types, ao.orders, ao.id, ao.iscompleted, ao.isnotcompleted, ao.price)
            order by ${orderby} ${order} limit ${limit > 0 ? limit : 'all'} offset ${offset}`,
      { type: QueryTypes.SELECT }
    )
    .catch((err: Error) => next(err))
  if (!list) return
  const countMaster = await Master.count().catch((err: Error) => next(err))
  if (!countMaster) return

  res.json({ list, count: countMaster })
}
