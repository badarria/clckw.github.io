import { Order } from '../../../db/models'
import { NextFunction, Request, Response } from 'express'
import pdf from 'html-pdf'
import pdfTemplate from '../docs/pdf-template'
import { ReadStream } from 'node:fs'
import { getPdfData } from './share'
import * as yup from 'yup'

const schema = yup.object().shape({
  id: yup.string().required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.params).catch((err: Error) => next(err))
  if (!validData) return

  const { id } = validData
  const dataForPdf = await getPdfData(id)
  if (dataForPdf instanceof Error) next(dataForPdf)
  else {
    pdf.create(pdfTemplate(dataForPdf)).toStream((err: Error, stream: ReadStream) => {
      if (err) next(err)
      res.setHeader('Content-type', 'application/pdf')
      !err && stream.pipe(res)
    })
  }
}
