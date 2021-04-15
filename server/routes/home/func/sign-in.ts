import bcrypt from 'bcrypt'
import { User } from '../../../db/models'
import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { getUserByRole } from './share'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().trim().min(5).required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.body).catch((err: Error) => next(err))

  if (validData) {
    const { email, password } = validData
    const user = await User.findOne({ where: { email } }).catch((err: Error) => next(err))
    if (user) {
      const { id, salt, pass, token, role } = user
      const bcryptPassword = await bcrypt.hash(password, salt).catch((err: Error) => next(err))
      const isMatch = bcryptPassword === pass

      if (isMatch) {
        const userByRole = await getUserByRole(role, token, id).catch((err: Error) => next(err))
        return res.json(userByRole)
      } else next(new Error('Name or password is incorrect'))
    } else next(new Error('Name or password is incorrect'))
  }
}
