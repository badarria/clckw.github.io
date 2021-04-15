import { NextFunction, Request, Response } from 'express'
import { CustomerSchema } from '../../../shared/validation'
import { Customer, User } from '../../../../db/models'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await CustomerSchema.validate(req.body).catch((err: Error) => next(err))
  if (validData) {
    const { name, surname, email, id, password } = validData
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)
    const bcPass = await bcrypt.hash(password, salt)
    const token = v4()
    const result = await Customer.update({ name, surname }, { where: { id }, returning: true }).catch((err: Error) =>
      next(err)
    )
    const userId = result && result[1][0].user_id
    if (result && userId) {
      const updUser = await User.update({ pass: bcPass, salt, email }, { where: { id: userId } }).catch((err: Error) =>
        next(err)
      )
      const msg = result[0] ? 'Customer was updated' : 'Customer not found'
      const type = result[0] ? 'success' : 'warning'
      return updUser && res.json({ type, msg })
    } else if (result && !userId) {
      const newUser = await User.create({ salt, pass: bcPass, email, token, role: 'customer' }).catch((err: Error) =>
        next(err)
      )
      const userId = newUser && newUser.id
      const updCustomer =
        userId && (await Customer.update({ user_id: userId }, { where: { id } }).catch((err: Error) => next(err)))
      const msg = result[0] ? 'Customer  was updated' : 'Customer not found'
      const type = result[0] ? 'success' : 'warning'
      return updCustomer && res.json({ type, msg })
    } else throw new Error("Customer wasn't updated")
  }
}
