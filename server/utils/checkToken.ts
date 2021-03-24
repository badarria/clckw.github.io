import { User } from './../db/models/Users'
import { NextFunction, Request, Response } from 'express'

const checkToken = async (token: string) => {
  const user = await User.findOne({ where: { token } })
  if (user) {
    return user.role
  } else return new Error('Not Authorize')
}

export const checkMasterToken = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers
  const role = typeof token === 'string' && (await checkToken(token).catch((err) => next(err)))
  if (role && role === 'master') next()
  else next(new Error('Token is invalid'))
}

export const checkAdminToken = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers
  const role = typeof token === 'string' && (await checkToken(token).catch((err) => next(err)))
  if (role && role === 'admin') next()
  else next(new Error('Token is invalid'))
}

export const checkCustomerToken = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers
  const role = typeof token === 'string' && (await checkToken(token).catch((err) => next(err)))
  if (role && role === 'customer') next()
  else next(new Error('Token is invalid'))
}
