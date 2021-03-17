import { Request, Response, NextFunction } from 'express'
import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'
import { config } from '../../config'

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

export const createMail = (mail: any, userEmail: string, subj: string) => {
  const generatedMail = MailGenerator.generate(mail)
  return {
    from: email,
    to: userEmail,
    subject: subj,
    html: generatedMail,
  }
}

export const sendMail = () => async (req: Request, res: Response) => {
  try {
    const message = req.body
    await transporter.sendMail(message)
    res.json({ msg: 'you should receive an email from us' })
  } catch (e) {
    console.error(e.message)
    res.status(400).send({ msg: 'Something went wrong and mail was not sent' })
  }
}
