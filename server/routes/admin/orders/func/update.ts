import { NextFunction, Request, Response } from 'express'
import { OrderSchema } from '../../../shared/validation'
import { Order } from '../../../../db/models'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await OrderSchema.validate(req.body).catch((err: Error) => next(err))
  if (validData) {
    const { master, customer, service, begin, finish, id } = validData

    const result = await Order.update(
      { master_id: master, customer_id: customer, service_id: service, beginat: begin, finishat: finish },
      { where: { id } }
    ).catch((err: Error) => next(err))
    if (result) {
      const msg = result[0] ? 'Order  was updated' : 'Order not found'
      const type = result[0] ? 'success' : 'warning'
      return res.json({ type, msg })
    }
  }
}
