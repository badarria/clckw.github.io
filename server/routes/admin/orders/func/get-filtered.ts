import { NextFunction, Request, Response } from 'express'
import { Order } from '../../../../db/models'
import { Op } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import * as yup from 'yup'

export const schema = yup.object().shape({
  master_id: yup.number().required(),
  date: yup.string().required(),
  order_id: yup.number().required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  let validData = await schema.validate(req.query).catch((err: Error) => next(err))
  if (validData) {
    const { master_id, date, order_id } = validData
    const filteredOrders = await Order.findAll({
      attributes: ['finishat', 'beginat', 'finish', 'begin'],

      where: {
        [Op.and]: Sequelize.where(Sequelize.cast(Sequelize.col('beginat'), 'date'), date),
        master_id,
        id: { [Op.not]: order_id },
      },
    }).catch((err: Error) => next(err))

    return filteredOrders && res.json(filteredOrders)
  }
}
