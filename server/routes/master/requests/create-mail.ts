import { NextFunction, Request, Response } from 'express'
import { createMail, jwtGenerator } from '../../shared/utils'
import { config } from '../../../../config'
import pdf from 'html-pdf'
import pdfTemplate from '../docs/pdf-template'
import { ReadStream } from 'node:fs'
import * as yup from 'yup'
import { getPdfData } from './share'
const url = config.mailing.baseUrl

export const schema = yup.object().shape({
  userEmail: yup.string().email().required(),
  name: yup.string().required(),
  id: yup.string().required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.body).catch((err: Error) => next(err))
  if (!validData) return

  const { userEmail, name, id } = validData
  const token = jwtGenerator(id)
  const mail = {
    body: {
      title: `Hi, ${name}! We need your feedback`,
      action: {
        instructions: "Please, follow the link below to rate the master's work",
        button: {
          color: '#3f51b5',
          text: 'Go to Rating',
          link: `${url}/orderRate/${token}`,
        },
      },
      outro: 'Thanks for choosing us!',
    },
  }
  const subj = 'We need your feedback!'
  const dataForPdf = await getPdfData(id)
  if (dataForPdf instanceof Error) next(dataForPdf)
  else {
    const createMailWithPdf = () =>
      new Promise((resolve, reject) =>
        pdf.create(pdfTemplate(dataForPdf)).toStream((err: Error, stream: ReadStream) => {
          if (err) return reject(err)
          const attach = [
            {
              filename: 'receipt.pdf',
              type: 'application/pdf',
              content: stream,
            },
          ]
          return resolve(createMail(mail, userEmail, subj, attach))
        })
      )
    req.body = await createMailWithPdf().catch((err: Error) => next(err))

    next()
  }
}
