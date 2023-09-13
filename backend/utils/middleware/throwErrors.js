const throwErrors = (message) => {
	console.error(message)
	throw new Error(message)
}

module.exports = {
	throwErrors,
}
