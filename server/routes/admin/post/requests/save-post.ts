import { Post } from './../../../../db/models/Post'
import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'

const schema = yup.object().shape({
  content: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  preview: yup.string().required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.body).catch((err: Error) => next(err))
  if (!validData) return
  const { content, title, description, preview } = validData
  const newPost = await Post.create({ content, title, description, preview }).catch((err: Error) => next(err))
  if (!newPost) return
  return res.json({ type: 'success', msg: 'Post was created' })
}
