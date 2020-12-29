const router = require('express').Router();
const {dbTryCatch} = require("../../../middleware/common");
const {services} = require('../../../validation/schemes/admin-schema')
const validator = require('../../../validation/validator')
const {update, getList, remove, add} = require("./services-requests");


router.get('/', dbTryCatch(getList))
router.put('/:id', validator(services), dbTryCatch(update))
router.delete('/:id', dbTryCatch(remove))
router.post('/', validator(services), dbTryCatch(add))


module.exports = router;