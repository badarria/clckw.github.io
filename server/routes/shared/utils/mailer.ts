import { Request, Response, NextFunction } from 'express'
import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'
import { config } from '../../../../config'
import { ReadStream } from 'node:fs'

const { email, password, baseUrl } = config.mailing
type CreateMail = (
  mail: Mail,
  userEmail: string,
  subj: string,
  attach?: {
    filename: string
    content: ReadStream
    type: string
  }[]
) => {
  from: string
  to: string
  subject: string
  html: string
  attachments: {
    filename: string
    content: ReadStream
    type: string
  }[]
}
export type Table = {
  title: string
  data: {
    'Order date'?: string
    City?: string
    'Your master'?: string
    'Size of clock'?: string
    Login?: string
    Password?: string
  }[]
}[]

export type Mail =
  | {
      body: { name: string; table: Table; outro: string }
    }
  | {
      body: {
        title: string
        action: {
          instructions: string
          button: {
            color: string
            text: string
            link: string
          }
        }
        outro: string
      }
    }

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass: password,
  },
})

export const MailGenerator = new Mailgen({
  theme: 'salted',
  product: {
    name: 'Clockware',
    link: baseUrl,
  },
})

export const createMail: CreateMail = (mail, userEmail, subj, attach = []) => {
  const generatedMail = MailGenerator.generate(mail)
  return {
    from: email,
    to: userEmail,
    subject: subj,
    html: generatedMail,
    attachments: attach,
  }
}

export const sendMail = () => async (req: Request, res: Response, next: NextFunction) => {
  const message = req.body

  const result = await transporter.sendMail(message).catch((err: Error) => next(err))
  result && res.json({ msg: 'Mail was sent' })
}
