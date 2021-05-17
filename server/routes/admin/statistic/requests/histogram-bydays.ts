import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { sequelize } from '../../../../db'
import { QueryTypes } from 'sequelize'

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
      `SELECT day, sum(count) as total, json_agg(jsonb_build_object('count', count, 'master', master, 'city', city)) as orders
    FROM (
      SELECT m.id, m.name || ' ' || m.surname as master, ci.name as city, beginat::date as day, COUNT(*)
      FROM orders o LEFT JOIN masters m ON m.id=o.master_id LEFT JOIN cities ci ON ci.id=m.city_id WHERE o.beginat BETWEEN ${begin}::date AND ${finish}::date
      AND ci.id IS NOT NULL AND m.id IS NOT NULL
      GROUP BY (m.id, ci.id, day)) s group by day order by day asc`,
      { type: QueryTypes.SELECT }
    )
    .catch((err: Error) => next(err))
  if (!list) return

  res.json(list)
}
