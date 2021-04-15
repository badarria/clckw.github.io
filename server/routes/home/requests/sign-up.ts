import bcrypt from 'bcrypt'
import { Master, Customer, User } from '../../../db/models'
import { NextFunction, Request, Response } from 'express'
import { name } from '../../shared/validation'
import * as yup from 'yup'
import { v4 } from 'uuid'

const schema = yup.object().shape({
  city: yup.object().shape({
    id: yup.number(),
    name: yup.string(),
  }),
  name,
  surname: name,
  email: yup.string().email().required(),
  password: yup.string().required(),
  master: yup.boolean().required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.body).catch((err: Error) => next(err))
  if (!validData) return

  const { name, surname, city, password, email, master } = validData
  const role = master ? 'master' : 'customer'
  const saltRound = 10
  const salt = await bcrypt.genSalt(saltRound)
  const bcPass = await bcrypt.hash(password, salt)
  const userToken = v4()

  const user = await User.create({
    salt,
    pass: bcPass,
    token: userToken,
    email,
    role,
  }).catch((err: Error) => next(err))
  if (!user) return

  if (master) {
    const { id } = user
    const newMaster = await Master.create({ name, surname, city_id: city.id, user_id: id }).catch((err: Error) =>
      next(err)
    )
    return newMaster && res.json({ token: userToken, role: 'master', id: newMaster.id, name })
  } else {
    const { id } = user
    const newCustomer = await Customer.create({ name, surname, user_id: id }).catch((err: Error) => next(err))
    return newCustomer && res.json({ token: userToken, role: 'customer', id: newCustomer.id, name })
  }
}
