const router = require('express').Router()
const { update, add, remove, getList, getKeys } = require('./masters-requests')
const { masters } = require('../../../validation/admin-schema')
const { checkToken, dbTryCatch, validator } = require('../../../utils')

router.get('/:limit/:offset/:order/:orderby', checkToken(), dbTryCatch(getList))
router.get('/foreignKeys', checkToken(), dbTryCatch(getKeys))
router.put('/', checkToken(), validator(masters), dbTryCatch(update))
router.post('/', checkToken(), validator(masters), dbTryCatch(add))
router.delete('/:id', checkToken(), dbTryCatch(remove))

module.exports = router
