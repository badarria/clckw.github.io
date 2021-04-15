import { User } from '../../../db/models'
import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { OAuth2Client } from 'google-auth-library'
import { config } from './../../../../config'
import { getUserByRole } from './share'
const google = config.google
const client = new OAuth2Client(google.client_id)

const schema = yup.object().shape({
  token: yup.string().required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.body).catch((err: Error) => next(err))
  if (!validData) return

  const ticket = await client
    .verifyIdToken({
      idToken: validData.token,
      audience: google.client_id,
    })
    .catch((err) => next(err))
  if (!ticket) return

  const payload = ticket.getPayload()
  const user = payload && (await User.findOne({ where: { email: payload.email } }))
  if (!user) return next(new Error('User with this email not found. Try to login with password'))

  const { id, token, role } = user
  const userByRole = await getUserByRole(role, token, id).catch((err: Error) => next(err))
  res.json(userByRole)
}
