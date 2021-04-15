import { CustomerSchema } from '../../shared/validation'
import bcrypt from 'bcrypt'
import * as genPass from 'generate-password'
import { Customer, User } from '../../../db/models'
import { NextFunction, Request, Response } from 'express'
import { v4 } from 'uuid'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await CustomerSchema.validate(req.body).catch((err: Error) => next(err))
  if (!validData) return

  const { email, name, surname } = validData
  const existUser = await User.findOne({ where: { email } }).catch((err: Error) => next(err))
  if (existUser && 'id' in existUser) {
    const { id } = existUser
    const updCustomer = await Customer.update(
      { name, surname },
      { where: { user_id: id }, returning: true }
    ).catch((err) => next(err))
    return updCustomer && res.json({ password: '', id: updCustomer[1][0].id })
  } else {
    let password = genPass.generate({ length: 8, numbers: true })
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)
    const bcPass = await bcrypt.hash(password, salt)
    const token = v4()
    const newUser = await User.create({ token, pass: bcPass, salt, role: 'customer', email }).catch((err: Error) =>
      next(err)
    )
    const userId = newUser && newUser.id
    const newCustomer = await Customer.create({ name, surname, user_id: userId }).catch((err: Error) => next(err))
    return newCustomer && res.json({ password, id: newCustomer.id })
  }
}
