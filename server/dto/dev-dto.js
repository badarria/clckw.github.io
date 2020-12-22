const yup = require('yup')


module.exports = yup.object().shape({
	name: yup.number().required(),
	surname: yup.string().trim().required()
})