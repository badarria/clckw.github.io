import { NextFunction, Request, Response } from 'express'
import { CustomerSchema } from '../../../shared/validation'
import { Customer, User } from '../../../../db/models'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await CustomerSchema.validate(req.body).catch((err: Error) => next(err))
  if (!validData) return

  const { name, surname, email, password } = validData
  const saltRound = 10
  const salt = await bcrypt.genSalt(saltRound)
  const bcPass = await bcrypt.hash(password, salt)
  const token = v4()
  const newUser = await User.create({ role: 'customer', pass: bcPass, email, salt, token }).catch((err: Error) => {
    if (err.name === 'SequelizeUniqueConstraintError') next(new Error('Customer with this email already exist'))
  })

  const result =
    newUser && (await Customer.create({ name, surname, user_id: newUser.id }).catch((err: Error) => next(err)))
  return result && newUser && res.json({ type: 'success', msg: 'Customer was added' })
}
