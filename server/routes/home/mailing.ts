import { NextFunction, Request, Response } from 'express'
import { firstMailSchema } from '../../validation'
import { createMail } from '../../utils'

export const confirmingMail = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await firstMailSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const { userEmail, name, begin, city, service, master, password } = validData
    const table: any = [
      {
        title: 'Your order details:',
        data: [{ 'Order date': begin, City: city, 'Your master': master, 'Size of clock': service }],
      },
    ]
    password && table.push({ title: 'Your registration details:', data: [{ Login: userEmail, Password: password }] })

    const mail = {
      body: { name, table, outro: 'Thanks for choosing us!' },
    }
    const subj = 'Your order has been processed successfully'
    req.body = createMail(mail, userEmail, subj)
    next()
  }
}
