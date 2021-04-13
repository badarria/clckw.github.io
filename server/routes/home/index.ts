import { findMasters, upsertCustomer, addNewOrder, getInitState } from './search'
import { sendMail } from '../../utils'
import { Router } from 'express'
import { auth, handleGgLogin, handleLocalReg, stayAuth, handleGgReg } from './auth'
import { confirmingMail } from './mailing'
import { handlePayment } from './payment'
const index = Router()

index.get('/init', getInitState)
index.get('/find/:city/:begin/:finish', findMasters)
index.post('/customer', upsertCustomer)
index.post('/auth', auth)
index.post('/newOrder', addNewOrder)
index.post('/confirm', confirmingMail, sendMail())
index.get('/verify', stayAuth)
index.post('/signUp', handleLocalReg)
index.post('/handlePay', handlePayment)
index.post('/signInGoogle', handleGgLogin)
index.post('/signUpGoogle', handleGgReg)
// index.post('/signInFb', signInFb)
export { index }
