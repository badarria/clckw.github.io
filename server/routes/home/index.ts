import {
  findMasters,
  upsertCustomer,
  handlePay,
  addNewOrder,
  getInit,
  signIn,
  createConfirmMail,
  verify,
  signUp,
  signInGoogle,
  signUpGoogle,
  getPostsList,
  getOnePost,
} from './requests'
import { sendMail } from '../shared/utils'
import { Router } from 'express'
import { sequelize } from '../../db'
const index = Router()

const magic = sequelize.models.Customer

index.get('/init', getInit)
index.get('/find/:city/:begin/:finish', findMasters)
index.post('/customer', upsertCustomer)
index.post('/auth', signIn)
index.post('/newOrder', addNewOrder)
index.post('/confirm', createConfirmMail, sendMail())
index.get('/verify', verify)
index.post('/signUp', signUp)
index.post('/handlePay', handlePay)
index.post('/signInGoogle', signInGoogle)
index.post('/signUpGoogle', signUpGoogle)
index.get('/getPostsList', getPostsList)
index.get('/getPost/:id', getOnePost)

export { index }
