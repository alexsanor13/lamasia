const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const readFileAsync = promisify(fs.readFile)

const { QR_CONTAINER } = require('../config')
const { throwErrors } = require('../middleware/throwErrors')

// Reads the content of the QR and return the Base64
async function readQRImage(qrName) {
	try {
		const qrImagePath = path.join(
			__dirname,
			'..',
			'..',
			QR_CONTAINER,
			`${qrName}.png`
		)
		const qrImageBuffer = await readFileAsync(qrImagePath)
		const qrImageBase64 = qrImageBuffer.toString('base64')

		return qrImageBase64
	} catch (e) {
		throwErrors(`Error reading qr: ${qrName}`, `readQRImage`)
	}
}

// Reads the content of a QR file and return the file buffer
async function readQRImageFile(qrName) {
	try {
		const qrImagePath = path.join(
			__dirname,
			'..',
			'..',
			QR_CONTAINER,
			`${qrName}.png`
		)
		const qrImageBuffer = await readFileAsync(qrImagePath)

		return qrImageBuffer
	} catch (e) {
		throwErrors(`Error reading qr: ${qrName}`, `readQRImageFile`)
	}
}

module.exports = { readQRImage, readQRImageFile }
