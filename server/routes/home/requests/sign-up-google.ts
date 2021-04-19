import bcrypt from 'bcrypt'
import * as genPass from 'generate-password'
import { NextFunction, Request, Response } from 'express'
import { num } from '../../shared/validation'
import * as yup from 'yup'
import { config } from './../../../../config'
import { Master, Customer, User } from '../../../db/models'
import { v4 } from 'uuid'
import { OAuth2Client } from 'google-auth-library'
const google = config.google
const client = new OAuth2Client(google.client_id)

const schema = yup.object().shape({
  token: yup.string().required(),
  isMaster: yup.boolean().required(),
  city: yup.object().shape({
    id: num,
    name: yup.string(),
  }),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.body).catch((err: Error) => next(err))
  if (!validData) return

  const { isMaster, token, city } = validData
  const ticket = await client
    .verifyIdToken({
      idToken: token,
      audience: google.client_id,
    })
    .catch((err: Error) => next(err))
  if (!ticket) return

  const payload = ticket.getPayload()
  if (!payload) return

  const { given_name, family_name, email } = payload
  const role = isMaster ? 'master' : 'customer'
  const saltRound = 10
  const salt = await bcrypt.genSalt(saltRound)
  let password = genPass.generate({ length: 8, numbers: true })
  const bcPass = await bcrypt.hash(password, salt)
  const userToken = v4()

  const newUser = await User.create({ email, role, salt, pass: bcPass, token: userToken }).catch((err: Error) => {
    if (err.name === 'SequelizeUniqueConstraintError')
      next(new Error('User with this email already exist. Try to login with google'))
    next(err)
  })
  if (!newUser) return

  if (isMaster) {
    const { id } = newUser
    const newMaster = await Master.create({
      name: given_name,
      surname: family_name,
      city_id: city.id,
      user_id: id,
    }).catch((err: Error) => next(err))
    return newMaster && res.json({ token: userToken, role: 'master', id: newMaster.id, given_name })
  } else {
    const { id } = newUser
    const newCustomer = await Customer.create({
      name: given_name,
      surname: family_name,
      user_id: id,
    }).catch((err: Error) => next(err))
    return newCustomer && res.json({ token: userToken, role: 'customer', id: newCustomer.id, given_name })
  }
}
