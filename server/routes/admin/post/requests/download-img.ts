import { NextFunction, Request, Response } from 'express'
import { cloudinary } from '../../../shared/utils'
import * as yup from 'yup'

const schema = yup.object().shape({
  file: yup.string().required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.body).catch((err: Error) => next(err))
  if (!validData) return
  const cloudData = await cloudinary.v2.uploader.upload(validData.file).catch((err: Error) => next(err))
  if (!cloudData) return
  return res.json(cloudData.url)
}
