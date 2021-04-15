import { RemoveSchema } from '../../../shared/validation'
import { NextFunction, Request, Response } from 'express'
import { Master, User } from '../../../../db/models'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await RemoveSchema.validate(req.params).catch((err: Error) => next(err))

  if (!validData) return
  const { id } = validData
  const master = await Master.findOne({ where: { id } }).catch((err: Error) => next(err))
  if (!master) return res.json({ type: 'warning', msg: 'Master not found' })

  const userId = master.user_id
  const removeUser = userId && (await User.destroy({ where: { id: userId } }).catch((err: Error) => next(err)))
  const result = !removeUser && (await Master.destroy({ where: { id } }).catch((err: Error) => next(err)))

  if (result || removeUser) {
    const msg = 'Master was removed from database'
    const type = 'success'
    return res.json({ type, msg })
  }
}
