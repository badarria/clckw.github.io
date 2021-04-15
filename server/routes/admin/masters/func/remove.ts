import { RemoveSchema } from '../../../shared/validation'
import { NextFunction, Request, Response } from 'express'
import { Master, User } from '../../../../db/models'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await RemoveSchema.validate(req.params).catch((err: Error) => next(err))
  if (validData) {
    const { id } = validData
    const master = await Master.findOne({ where: { id } }).catch((err: Error) => next(err))

    if (master && 'id' in master) {
      const userId = master.user_id

      const removeUser = userId && (await User.destroy({ where: { id: userId } }).catch((err: Error) => next(err)))
      const result = !removeUser && (await Master.destroy({ where: { id } }).catch((err: Error) => next(err)))
      if (result || removeUser) {
        const msg = result || removeUser ? 'Master was removed from database' : 'Master not found'
        const type = result || removeUser ? 'success' : 'warning'
        return res.json({ type, msg })
      }
    }
  }
}
