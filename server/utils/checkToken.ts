import { jwtDecode } from './jwtGenerator'
import { Admin } from '../db/models'
import { NextFunction, Request, Response } from 'express'

export const checkToken = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.headers
    if (typeof token === 'string') {
      const uuid = jwtDecode(token)

      if (typeof uuid === 'string') {
        const user = await Admin.findAll({ where: { id: uuid } }).catch((err) => next(err))
        if (user && user[0].id === uuid) {
          next()
        }
      }
    } else return res.status(403).json('Not Authorize')
  } catch (err) {
    console.error(err.message)
    return res.status(403).json('Not Authorize')
  }
}
