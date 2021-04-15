import { Photo } from '../../../db/models'
import { NextFunction, Request, Response } from 'express'
import { cloudinary } from '../../shared/utils'
import * as yup from 'yup'

const schema = yup.object().shape({
  id: yup.number().required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.params).catch((err: Error) => next(err))
  if (validData) {
    const { id } = req.params
    const photos = await Photo.findAll({ where: { order_id: id } }).catch((err: Error) => next(err))
    if (photos) {
      const public_ids: string[] = []
      photos.forEach((photo) => {
        const { public_id } = photo
        public_ids.push(public_id)
      })

      const sources = cloudinary.v2.utils.download_zip_url({ public_ids })
      return res.json(sources)
    }
  }
}
