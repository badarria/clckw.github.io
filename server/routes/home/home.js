const {
  findMasters,
  upsertCustomer,
  auth,
  confirmingMail,
  stayAuth,
  addNewOrder,
  ratingRequestMail,
  getInitState,
} = require('./home-requests')
const router = require('express').Router()
const { masters, customer, loginForm, order } = require('../../validation/home-schema')
const { dbTryCatch, validator, createMail, sendMail } = require('../../utils')

router.get('/init', dbTryCatch(getInitState))
router.get('/find/:city/:begin/:finish', validator(masters, 'params'), dbTryCatch(findMasters))
router.post('/customer', validator(customer), dbTryCatch(upsertCustomer))
router.post('/auth', validator(loginForm), dbTryCatch(auth))
router.post('/newOrder', validator(order), dbTryCatch(addNewOrder))
router.post('/confirm', createMail(confirmingMail), sendMail())
router.post('/rating', createMail(ratingRequestMail), sendMail())
router.get('/verify', dbTryCatch(stayAuth))

module.exports = router
