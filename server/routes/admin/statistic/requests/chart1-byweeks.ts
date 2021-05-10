import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { sequelize } from '../../../../db'
import { QueryTypes } from 'sequelize'

const schema = yup.object().shape({
  begin: yup.string().required(),
  finish: yup.string().required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.params).catch(err => next(err))
  if (!validData) return

  const { begin, finish } = validData
  const list = await sequelize
    .query(
      `WITH bymast AS (SELECT week, json_agg(jsonb_build_object('master', master, 'count', count)) as bymasters
      FROM (
        SELECT m.id, m.name || ' ' || m.surname as master, extract(week from beginat::timestamp) as week, COUNT(*)
        FROM orders o LEFT JOIN masters m on m.id=o.master_id WHERE o.beginat BETWEEN ${begin}::date and ${finish}::date
        GROUP BY (m.id, week)) s GROUP BY week),
    byci AS (SELECT week, json_agg(jsonb_build_object('city', city, 'count', count)) as bycities
      FROM (
        SELECT ci.id, ci.name as city, extract(week from beginat::timestamp) as week, COUNT(*)
        FROM orders o LEFT JOIN masters m on m.id=o.master_id LEFT JOIN cities ci on m.city_id=ci.id WHERE o.beginat BETWEEN ${begin}::date and ${finish}::date
        GROUP BY (ci.id, week)) s GROUP BY week),
    summ AS (SELECT extract(week from beginat::timestamp) as week, count(*) as total
      FROM orders WHERE beginat BETWEEN ${begin}::date and ${finish}::date GROUP BY week)

    SELECT * FROM bymast LEFT JOIN byci on bymast.week=byci.week LEFT JOIN summ on bymast.week=summ.week`,
      { type: QueryTypes.SELECT }
    )
    .catch((err: Error) => next(err))
  if (!list) return

  res.json(list)
}
