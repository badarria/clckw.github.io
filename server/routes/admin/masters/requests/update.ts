import { MasterSchema } from '../../../shared/validation'
import { NextFunction, Request, Response } from 'express'
import { Master, User } from '../../../../db/models'
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await MasterSchema.validate(req.body).catch((err: Error) => next(err))
  if (!validData) return

  const { name, surname, city, id, password, email } = validData
  const result = await Master.update(
    { name, surname, city_id: city },
    { where: { id }, returning: true }
  ).catch((err: Error) => next(err))
  const userId = result && JSON.parse(JSON.stringify(result))[1][0].user_id
  const saltRound = 10
  const salt = await bcrypt.genSalt(saltRound)
  const bcPass = await bcrypt.hash(password, salt)
  const token = v4()
  if (result && userId) {
    const updUser = await User.update({ pass: bcPass, salt, email }, { where: { id: userId } }).catch((err: Error) =>
      next(err)
    )
    const msg = result[0] ? 'Master  was updated' : 'Master not found'
    const type = result[0] ? 'success' : 'warning'
    return updUser && res.json({ type, msg })
  } else if (result && !userId) {
    const newUser = await User.create({ salt, pass: bcPass, email, token, role: 'master' }).catch((err: Error) =>
      next(err)
    )
    const userId = newUser && newUser.id
    const updMaster =
      userId && (await Master.update({ user_id: userId }, { where: { id } }).catch((err: Error) => next(err)))
    const msg = result[0] ? 'Master  was updated' : 'Master not found'
    const type = result[0] ? 'success' : 'warning'
    return updMaster && res.json({ type, msg })
  } else {
    throw new Error("Master wasn't updated")
  }
}
