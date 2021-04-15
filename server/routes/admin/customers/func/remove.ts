import { NextFunction, Request, Response } from 'express'
import { RemoveSchema } from '../../../shared/validation'
import { Customer, User } from '../../../../db/models'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await RemoveSchema.validate(req.params).catch((err: Error) => next(err))
  if (validData) {
    const { id } = validData
    const customer = await Customer.findOne({ where: { id } }).catch((err: Error) => next(err))
    if (customer) {
      const userId = customer.user_id
      const removeUser = await User.destroy({ where: { id: userId } }).catch((err: Error) => next(err))
      const result = !removeUser && (await Customer.destroy({ where: { id } }).catch((err: Error) => next(err)))
      if (removeUser || result) {
        const msg = removeUser || result ? 'Customer was removed from database' : 'Customer not found'
        const type = removeUser || result ? 'success' : 'warning'
        return res.json({ type, msg })
      }
    }
  }
}
