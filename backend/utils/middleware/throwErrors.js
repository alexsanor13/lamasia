const throwErrors = (message, from = '') => {
	console.error(`${from} - ${message}`)
	throw new Error(`${from} - ${message}`)
}

module.exports = {
	throwErrors,
}
