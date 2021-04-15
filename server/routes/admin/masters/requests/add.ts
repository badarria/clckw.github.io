import { MasterSchema } from '../../../shared/validation'
import { NextFunction, Request, Response } from 'express'
import { Master, User } from '../../../../db/models'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await MasterSchema.validate(req.body).catch((err: Error) => next(err))

  if (!validData) return
  const { name, surname, city, password, email } = validData
  const saltRound = 10
  const salt = await bcrypt.genSalt(saltRound)
  const bcPass = await bcrypt.hash(password, salt)
  const token = v4()
  const newUser = await User.create({ role: 'master', pass: bcPass, email, salt, token }).catch((err: Error) =>
    next(err)
  )
  if (!newUser) return

  const result = await Master.create({ name, surname, city_id: city, user_id: newUser.id }).catch((err: Error) =>
    next(err)
  )
  return result && res.json({ type: 'success', msg: 'Master was added' })
}
