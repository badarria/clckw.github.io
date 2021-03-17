import {
  findMasters,
  upsertCustomer,
  auth,
  confirmingMail,
  stayAuth,
  addNewOrder,
  ratingRequestMail,
  getInitState,
} from './requests'
import { sendMail } from '../../utils'
import { Router } from 'express'
const index = Router()

index.get('/init', getInitState)
index.get('/find/:city/:begin/:finish', findMasters)
index.post('/customer', upsertCustomer)
index.post('/auth', auth)
index.post('/newOrder', addNewOrder)
index.post('/confirm', confirmingMail, sendMail())
index.post('/rating', ratingRequestMail, sendMail())
index.get('/verify', stayAuth)

export { index }
