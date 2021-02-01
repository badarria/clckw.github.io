const router = require('express').Router()
const { getList, update, remove, add } = require('./customers-requests')
const { customers } = require('../../../validation/admin-schema')
const { checkToken, dbTryCatch, validator } = require('../../../utils')

router.get('/:token/:limit/:offset/:orderby/:order', checkToken(), dbTryCatch(getList))
router.put('/:id', checkToken('body'), validator(customers), dbTryCatch(update))
router.delete('/:token/:id', checkToken(), dbTryCatch(remove))
router.post('/', checkToken('body'), validator(customers), dbTryCatch(add))

module.exports = router
