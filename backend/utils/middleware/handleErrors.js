const ERROR_HANDLERS = {
	CastError: (res) => res.status(400).send({ error: 'id is malformed' }),

	ValidationError: (res, { message }) =>
		res.status(409).send({ error: message }),

	defaultError: (res) => res.status(500).end(),
}

module.exports = (error, request, response, next) => {
	console.error(error)

	const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
	handler(response, error)
}
