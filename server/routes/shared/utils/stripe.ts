import Stripe from 'stripe'
import { config } from '../../../../config'

const secret_key = config.stripe.secret_key

export const stripe = new Stripe(secret_key, {
  apiVersion: '2020-08-27',
})
