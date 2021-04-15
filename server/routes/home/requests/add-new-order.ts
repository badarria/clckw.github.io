import { OrderSchema } from './../../shared/validation'
import { Order, Photo } from '../../../db/models'
import { NextFunction, Request, Response } from 'express'
import { cloudinary } from '../../shared/utils'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await OrderSchema.validate(req.body).catch((err: Error) => next(err))
  if (!validData) return

  const { master, customer, service, begin, finish, files = [] } = validData
  const newOrder = await Order.create({
    master_id: master,
    customer_id: customer,
    service_id: service,
    beginat: begin,
    finishat: finish,
  }).catch((err: Error) => next(err))
  if (!newOrder) return

  const { id } = newOrder
  let acc = files.length

  const promises = files.map((file: string) => {
    return cloudinary.v2.uploader
      .upload(file)
      .catch((err: Error) => err)
      .then((cloudData) => {
        if ('url' in cloudData) {
          const { url, public_id, resource_type } = cloudData
          return Photo.create({
            order_id: id,
            url,
            public_id,
            resource_type,
          })
        }
      })
      .then((newOrder) => {
        newOrder && (acc -= 1)
      })
      .catch((err: Error) => next(err))
  })

  return Promise.all(promises).then(() => {
    let msg = acc ? "Order accepted but something went wrong and photo wasn't downloaded." : 'Order accepted.'
    msg += ' We will send you a mail with details'

    id && res.json({ type: 'success', id: newOrder.id, msg })
  })
}
