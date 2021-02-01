const router = require('express').Router()
const { services } = require('../../../validation/admin-schema')
const { checkToken, dbTryCatch, validator } = require('../../../utils')
const { update, getList, remove, add } = require('./services-requests')

router.get('/:token/:limit/:offset/:orderby/:order', checkToken(), dbTryCatch(getList))
router.put('/:id', checkToken('body'), validator(services), dbTryCatch(update))
router.delete('/:token/:id', checkToken(), dbTryCatch(remove))
router.post('/', checkToken('body'), validator(services), dbTryCatch(add))

module.exports = router
