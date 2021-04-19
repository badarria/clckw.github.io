import { NextFunction, Request, Response } from 'express'
import { Table, Mail } from 'routes/shared/utils/mailer'
import * as yup from 'yup'
import { createMail } from '../../shared/utils'

const schema = yup.object().shape({
  userEmail: yup.string().email().required(),
  name: yup.string().required(),
  begin: yup.string().required(),
  city: yup.string().required(),
  service: yup.string().required(),
  master: yup.string().required(),
  password: yup.string(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.body).catch((err: Error) => next(err))
  if (!validData) return

  const { userEmail, name, begin, city, service, master, password } = validData
  const table: Table = [
    {
      title: 'Your order details:',
      data: [{ 'Order date': begin, City: city, 'Your master': master, 'Size of clock': service }],
    },
  ]
  password && table.push({ title: 'Your registration details:', data: [{ Login: userEmail, Password: password }] })

  const mail: Mail = {
    body: { name, table, outro: 'Thanks for choosing us!' },
  }
  const subj = 'Your order has been processed successfully'
  req.body = createMail(mail, userEmail, subj)
  next()
}
