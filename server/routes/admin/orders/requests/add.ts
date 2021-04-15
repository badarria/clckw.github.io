import { OrderSchema } from '../../../shared/validation'
import { NextFunction, Request, Response } from 'express'
import { Order } from '../../../../db/models'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await OrderSchema.validate(req.body).catch((err: Error) => next(err))
  if (!validData) return

  const { master, customer, service, begin, finish } = validData
  const result = await Order.create({
    master_id: master,
    customer_id: customer,
    service_id: service,
    beginat: begin,
    finishat: finish,
  }).catch((err: Error) => next(err))
  return result && res.json({ type: 'success', msg: 'Order was added' })
}
