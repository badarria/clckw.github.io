const router = require('express').Router()
const { services } = require('../../../validation/admin-schema')
const { checkToken, dbTryCatch, validator } = require('../../../utils')
const { update, getList, remove, add } = require('./services-requests')

router.get('/:limit/:offset/:order/:orderby', checkToken(), dbTryCatch(getList))
router.put('/', checkToken(), validator(services), dbTryCatch(update))
router.delete('/:id', checkToken(), dbTryCatch(remove))
router.post('/', checkToken(), validator(services), dbTryCatch(add))

module.exports = router
