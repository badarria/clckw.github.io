const { getFiltered, getKeys, getList, remove, update, add } = require('./orders-requests')
const { checkToken, dbTryCatch, validator } = require('../../../utils')
const { orders } = require('../../../validation/admin-schema')
const router = require('express').Router()

router.get('/:token/:limit/:offset/:orderby/:order', checkToken(), dbTryCatch(getList))
router.get('/filtered', dbTryCatch(getFiltered))
router.get('/foreignKeys/:token', checkToken(), dbTryCatch(getKeys))
router.put('/:id', checkToken('body'), validator(orders), dbTryCatch(update))
router.post('/', checkToken('body'), validator(orders), dbTryCatch(add))
router.delete('/:token/:id', checkToken(), dbTryCatch(remove))

module.exports = router
