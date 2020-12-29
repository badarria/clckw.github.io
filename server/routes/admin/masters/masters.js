const {dbTryCatch} = require("../../../middleware/common");
const router = require('express').Router();
const {update, add, remove, getList, getKeys} = require('./masters-requests')
const {masters} = require('../../../validation/schemes/admin-schema')
const validator = require('../../../validation/validator')

const dataSelector = () => async (req, res, next) => {
	try {
		const {city, name, surname, id} = req.body;
		req.body = {city: city.id, name, surname, id}
		next()
	} catch (e) {
		res.status(400).send({msg: 'Invalid data. Please, try again.'})
	}
}

router.get('/', dbTryCatch(getList))
router.get('/foreignKeys', dbTryCatch(getKeys))
router.put('/:id', validator(masters), dataSelector(), dbTryCatch(update))
router.post('/', validator(masters), dataSelector(), dbTryCatch(add))
router.delete('/:id', dbTryCatch(remove))


module.exports = router;