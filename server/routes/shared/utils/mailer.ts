import { Request, Response, NextFunction } from 'express'
import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'
import { config } from '../../../../config'
import { ReadStream } from 'node:fs'

const { email, password, baseUrl } = config.mailing

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

export const createMail = (
  mail: any,
  userEmail: string,
  subj: string,
  attach: {
    filename: string
    content: ReadStream
    type: string
  }[] = []
) => {
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
  console.log(4)
  const result = await transporter.sendMail(message).catch((err) => next(err))
  result && res.json({ msg: 'Mail was sent' })
}
