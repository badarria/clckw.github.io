import { NextFunction, Request, Response } from 'express'
import { paymentsDataSchema } from '../../validation'
import { stripe } from '../../utils'

export const handlePayment = async (req: Request, res: Response, next: NextFunction) => {
  const validData = await paymentsDataSchema.validate(req.body).catch((err) => next(err))
  if (validData) {
    const intent = await stripe.paymentIntents
      .create({
        payment_method: req.body.id,
        amount: req.body.amount * 100,
        currency: 'usd',
        confirmation_method: 'manual',
        confirm: true,
      })
      .catch((err) => next(err))

    if (intent && intent.status === 'succeeded') res.send({ type: 'success', msg: 'Payment was successfull' })
    if (intent && intent.status === 'requires_action') res.send({ type: 'warning', msg: 'Payment requires action' })
  }
}
