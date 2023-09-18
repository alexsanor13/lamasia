const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const readFileAsync = promisify(fs.readFile)

const { QR_CONTAINER } = require('../config')
const { throwErrors } = require('../middleware/throwErrors')

// let actualPath = ''
// if (debugMode) {
// 	const actualPath = process.env.PWD ? process.env.PWD : process.cwd()
// 	actualPath = path.join(actualPath, QR_CONTAINER)
// } else {
// 	actualPath = `.${QR_CONTAINER}`
// }

const actualPath = `../..${QR_CONTAINER}`

async function readQRImage(qrName) {
	try {
		const qrImagePath = `${actualPath}${qrName}.png`

		const qrImageBuffer = await readFileAsync(qrImagePath)
		const qrImageBase64 = qrImageBuffer.toString('base64')

		return qrImageBase64
	} catch (e) {
		throwErrors(`Error reading qr: ${qrName}`)
	}
}

async function readQRImageFile(qrName) {
	try {
		const qrImagePath = `${actualPath}${qrName}.png`

		const qrImageBuffer = await readFileAsync(qrImagePath)

		return qrImageBuffer
	} catch (e) {
		throwErrors(`Error reading qr: ${qrName}`)
	}
}

module.exports = { readQRImage, readQRImageFile }
