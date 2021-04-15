import { toObjFromStr, toObjFromJSDate } from '../../shared/utils/datetimefunc'
import { City, Order, Master } from '../../../db/models'
import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'

const schema = yup.object().shape({
  city: yup.number().required(),
  begin: yup.string().required(),
  finish: yup.string().required(),
})

type Result = { id: number; surname: string; name: string; rating: number | string }

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.params).catch((err: Error) => next(err))
  if (validData) {
    const { city, begin, finish } = validData

    const list = await Master.findAll({
      // attributes: ['rating', 'name', 'surname', 'id', 'fullName'],
      include: [
        { model: City, as: 'ci', where: { id: city } },
        {
          model: Order,
          as: 'o',
          required: false,
          attributes: ['rating', 'beginat', 'finishat'],
        },
      ],
    }).catch((err) => next(new Error(err)))

    if (Array.isArray(list)) {
      const result: Result[] = []
      list.forEach(({ rating, name, surname, id, o }) => {
        let reqBegin = toObjFromStr(begin),
          reqFinish = toObjFromStr(finish)

        const ordersOutRange = o.reduce((acc, { beginat, finishat }) => {
          if (reqFinish <= toObjFromJSDate(beginat) || reqBegin >= toObjFromJSDate(finishat)) {
            acc += 1
          }
          return acc
        }, 0)

        if (ordersOutRange === o.length) {
          result.push({ id, surname, name, rating })
        }
      })
      res.json(result)
    }
  }
}
