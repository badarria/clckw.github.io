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
  console.log(req.params)
  const { begin, finish } = validData
  const list = await sequelize
    .query(
      `SELECT week, sum(count) as total, json_agg(jsonb_build_object('count', count, 'master', master, 'city', city)) as orders
      FROM (
        SELECT m.id, m.name || ' ' || m.surname as master, ci.name as city, (extract(week from beginat::timestamp))::text as week, COUNT(*)
        FROM orders o LEFT JOIN masters m on m.id=o.master_id LEFT JOIN cities ci on ci.id=m.city_id WHERE o.beginat BETWEEN ${begin}::date
        AND ${finish}::date AND ci.id IS NOT NULL AND m.id IS NOT NULL
        GROUP BY (m.id, ci.id, week)) s group by week order by week asc`,
      { type: QueryTypes.SELECT }
    )
    .catch((err: Error) => next(err))
  if (!list) return

  res.json(list)
}
