const fs = require('fs')
const promisify = require('util').promisify
const readFileAsync = promisify(fs.readFile)
const { QR_CONTAINER } = require('../config')

async function readQRImage(qrName) {
	const qrImagePath = `${QR_CONTAINER}${qrName}.png`
	const qrImageBuffer = await readFileAsync(qrImagePath)
	const qrImageBase64 = qrImageBuffer.toString('base64')

	return qrImageBase64
}

module.exports = { readQRImage }
