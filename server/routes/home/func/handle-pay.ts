import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { stripe } from '../../shared/utils'

export const schema = yup.object().shape({
  id: yup.string().required(),
  amount: yup.number().required(),
})

export default async (req: Request, res: Response, next: NextFunction) => {
  const validData = await schema.validate(req.body).catch((err: Error) => next(err))
  if (validData) {
    const intent = await stripe.paymentIntents
      .create({
        payment_method: req.body.id,
        amount: req.body.amount * 100,
        currency: 'usd',
        confirmation_method: 'manual',
        confirm: true,
      })
      .catch((err: Error) => next(err))

    if (intent && intent.status === 'succeeded') res.send({ type: 'success', msg: 'Payment was successfull' })
    if (intent && intent.status === 'requires_action') res.send({ type: 'warning', msg: 'Payment requires action' })
  }
}
