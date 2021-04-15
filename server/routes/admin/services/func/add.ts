import { ServiceSchema } from '../../../shared/validation'
import { NextFunction, Request, Response } from 'express'
import { Service } from '../../../../db/models'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await ServiceSchema.validate(req.body).catch((err: Error) => next(err))

  if (validData) {
    const { name, time, price } = validData
    const result = await Service.create({ name, time, price }).catch((err: Error) => next(err))

    return result && res.json({ type: 'success', msg: 'Service was added' })
  }
}
