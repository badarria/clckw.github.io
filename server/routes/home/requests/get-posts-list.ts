import { Post } from '../../../db/models'
import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
  const list = await Post.findAll().catch((err: Error) => next(err))

  return list && res.json(list)
}
