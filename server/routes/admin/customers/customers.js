const router = require('express').Router()
const { getList, update, remove, add } = require('./customers-requests')
const { customers } = require('../../../validation/admin-schema')
const { checkToken, dbTryCatch, validator } = require('../../../utils')

router.get('/:limit/:offset/:order/:orderby', checkToken(), dbTryCatch(getList))
router.put('/', checkToken(), validator(customers), dbTryCatch(update))
router.delete('/:id', checkToken(), dbTryCatch(remove))
router.post('/', checkToken(), validator(customers), dbTryCatch(add))

module.exports = router
