import { User } from './../db/models/Users'
import { NextFunction, Request, Response } from 'express'

export const checkToken = () => async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers
  if (token && typeof token === 'string') {
    const user = await User.findOne({ where: { token } }).catch((err) => next(err))
    if (user && user.token === token) {
      next()
    }
  } else next(new Error('Not Authorize'))
}
