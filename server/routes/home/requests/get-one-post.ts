import { Post } from '../../../db/models'
import { Request, Response, NextFunction } from 'express'
import * as yup from 'yup'

const schema = yup.object().shape({
  id: yup.number().required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.params)
  if (!validData) return
  const { id } = validData
  const post = await Post.findOne({ where: { id } }).catch((err: Error) => next(err))

  return post && res.json(post)
}
