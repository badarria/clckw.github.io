import { Customer, Master, Order, Service } from '../../db/models'
import { NextFunction, Request, Response } from 'express'
import { mastersOrderSchema } from '../../validation'

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await mastersOrderSchema.validate(req.params).catch((err) => next(err))
  if (validData) {
    const { id, orderby, order, limit, offset } = validData
    let ord: any = [orderby, order]
    if (orderby === 'customer') ord = [{ model: Customer, as: 'c' }, 'name', order]
    if (orderby === 'service') ord = [{ model: Service, as: 's' }, 'name', order]
    if (orderby === 'date' || orderby === 'begin') ord = ['beginat', order]
    if (orderby === 'finish') ord = ['finishat', order]

    const params: any = { order: [ord] }
    if (limit >= 0) {
      params.limit = limit
      params.offset = offset
    }

    const list = await Order.findAll({
      ...params,
      attributes: ['id', 'date', 'begin', 'finish', 'rating', 'beginat', 'finishat'],
      include: [
        { model: Customer, as: 'c', attributes: ['name', 'surname', 'fullName'] },
        { model: Master, as: 'm', attributes: ['id', 'name', 'surname', 'fullName'], where: { id } },
        { model: Service, as: 's', attributes: [['name', 'service']] },
      ],
    }).catch((err) => next(err))
    list && res.json(list)
  }
}
