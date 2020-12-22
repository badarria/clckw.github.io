class ApiError {
	constructor(code, message) {
		this.message = message;
		this.code = code
	}
	static BadRequest(msg) {
		return new ApiError(400, msg)
	}
}

module.exports = ApiError