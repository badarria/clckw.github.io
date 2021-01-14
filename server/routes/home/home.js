const {
  findMasters,
  upsertCustomer,
  auth,
  confirmingMail,
  stayAuth,
  addNewOrder,
  ratingRequestMail,
} = require('./home-requests')
const authorization = require('../../middleware/authorization')
const router = require('express').Router()
const { masters, customer, loginForm, order } = require('../../validation/schemes/home-schema')
const validator = require('../../validation/validator')
const { sendMail, createMail } = require('../../middleware/mailer')
const { dbTryCatch } = require('../../middleware/wrap-func')

router.get('/find', validator(masters, 'query'), dbTryCatch(findMasters))
router.post('/customer', validator(customer), dbTryCatch(upsertCustomer))
router.post('/auth', validator(loginForm), dbTryCatch(auth))
router.post('/newOrder', validator(order), dbTryCatch(addNewOrder))
router.post('/confirm', createMail(confirmingMail), sendMail())
router.post('/rating', createMail(ratingRequestMail), sendMail())
router.get('/verify/:token', authorization, dbTryCatch(stayAuth))

module.exports = router
