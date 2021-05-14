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
      `SELECT m.name||' '||m.surname as master, count(*)::integer as total FROM orders o LEFT JOIN masters m on m.id=o.master_id LEFT JOIN cities ci on ci.id=m.city_id WHERE o.beginat BETWEEN ${begin}::date
      AND ${finish}::date AND m.id IS NOT null group by m.id `,
      { type: QueryTypes.SELECT }
    )
    .catch((err: Error) => next(err))
  if (!list) return

  res.json(list)
}
