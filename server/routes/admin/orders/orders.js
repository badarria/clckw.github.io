const { getFiltered, getKeys, getList, remove, update, add } = require('./orders-requests')
const { checkToken, dbTryCatch, validator } = require('../../../utils')
const { orders } = require('../../../validation/admin-schema')
const router = require('express').Router()

router.get('/:limit/:offset/:order/:orderby', checkToken(), dbTryCatch(getList))
router.get('/filtered/:date/:master_id/:order_id', dbTryCatch(getFiltered))
router.get('/foreignKeys', checkToken(), dbTryCatch(getKeys))
router.put('/', checkToken(), validator(orders), dbTryCatch(update))
router.post('/', checkToken(), validator(orders), dbTryCatch(add))
router.delete('/:id', checkToken(), dbTryCatch(remove))

module.exports = router
