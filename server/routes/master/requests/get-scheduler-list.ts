import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { toSchedulerFormat } from '../../shared/utils/datetimefunc'
import { Order, Customer, Service, Master } from '../../../db/models'

const schema = yup.object().shape({ id: yup.number().required() })

type Result = {
  id: number
  startDate: string
  endDate: string
  completed: boolean
  rating: number | null
  customer: string
  service: string
  price: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.params).catch((err: Error) => next(err))
  if (!validData) return

  const { id } = validData

  const list = await Order.findAll({
    attributes: ['id', 'date', 'begin', 'finish', 'rating', 'beginat', 'finishat', 'completed', 'customer'],
    include: [
      {
        model: Customer,
        as: 'c',
        attributes: ['name', 'surname', 'fullName', 'email'],
      },
      { model: Master, as: 'm', where: { id } },
      { model: Service, as: 's', attributes: [['name', 'service'], 'price'] },
    ],
  }).catch((err: Error) => next(err))
  if (!list) return

  const newList: Result[] = list.map((item: Order) => {
    const { beginat, finishat, s, service, customer, rating, price, id, completed } = item

    const endDate = toSchedulerFormat(finishat)
    const startDate = toSchedulerFormat(beginat)
    return { endDate, startDate, service, customer, rating, price, id, completed }
  })

  res.json(newList)
}
