const router = require('express').Router()
const { cities } = require('../../../validation/admin-schema')
const { checkToken, dbTryCatch, validator } = require('../../../utils')
const { update, getList, remove, add } = require('./cities-requests')

router.get('/:token/:limit/:offset/:orderby/:order', checkToken(), dbTryCatch(getList))
router.put('/:id', checkToken('body'), validator(cities), dbTryCatch(update))
router.delete('/:token/:id', checkToken(), dbTryCatch(remove))
router.post('/', checkToken('body'), validator(cities), dbTryCatch(add))

module.exports = router
