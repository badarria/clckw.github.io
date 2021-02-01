const router = require('express').Router()
const { update, add, remove, getList, getKeys } = require('./masters-requests')
const { masters } = require('../../../validation/admin-schema')
const { checkToken, dbTryCatch, validator } = require('../../../utils')

router.get('/:token/:limit/:offset/:orderby/:order', checkToken(), dbTryCatch(getList))
router.get('/foreignKeys/:token', checkToken(), dbTryCatch(getKeys))
router.put('/:id', checkToken('body'), validator(masters), dbTryCatch(update))
router.post('/', checkToken('body'), validator(masters), dbTryCatch(add))
router.delete('/:token/:id', checkToken(), dbTryCatch(remove))

module.exports = router
