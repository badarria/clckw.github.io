import { Master, Customer, User } from '../../../db/models'
import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'

const schema = yup.object().shape({
  token: yup.string().required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.headers).catch((err: Error) => next(err))
  if (!validData) return

  const { token } = validData
  const user = await User.findOne({ where: { token } }).catch((err: Error) => next(err))
  if (!user) return res.json(false)

  if (user.role === 'customer') {
    const customer = await Customer.findOne({ where: { user_id: user.id } }).catch((err: Error) => next(err))
    return customer && res.json({ role: 'customer', id: customer.id, token, name: customer.fullName })
  } else if (user.role === 'master') {
    const master = await Master.findOne({ where: { user_id: user.id } }).catch((err: Error) => next(err))
    return master && res.json({ role: 'master', id: master.id, token, name: master.fullName })
  } else return res.json({ token: user.token, id: 0, role: 'admin', name: 'admin' })
}
