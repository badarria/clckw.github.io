const ApiError = require('../error/api-error')

const validateDto = (schema) => {
	return async (req, res, next) => {
		try {
			const validatedBody = await schema.validate(req.body)
			req.body = validatedBody
			next();
		} catch (err) {
			next(ApiError.BadRequest(err))
		}
	}
}

module.exports = validateDto;