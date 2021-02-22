const router = require('express').Router()
const { cities } = require('../../../validation/admin-schema')
const { checkToken, dbTryCatch, validator } = require('../../../utils')
const { update, getList, remove, add } = require('./cities-requests')

router.get('/:limit/:offset/:order/:orderby', checkToken(), dbTryCatch(getList))
router.put('/', checkToken('body'), validator(cities), dbTryCatch(update))
router.delete('/:id', checkToken(), dbTryCatch(remove))
router.post('/', validator(cities), checkToken(), dbTryCatch(add))

module.exports = router
