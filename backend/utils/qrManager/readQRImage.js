const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const readFileAsync = promisify(fs.readFile)

const { ROOT_PATH } = require('../config')
const { throwErrors } = require('../middleware/throwErrors')

async function readQRImage(qrName) {
	try {
		const qrImagePath = `${ROOT_PATH}${qrName}.png`

		const qrImageBuffer = await readFileAsync(qrImagePath)
		const qrImageBase64 = qrImageBuffer.toString('base64')

		return qrImageBase64
	} catch (e) {
		throwErrors(`Error reading qr: ${qrName}`)
	}
}

async function readQRImageFile(qrName) {
	try {
		const qrImagePath = `${ROOT_PATH}${qrName}.png`

		const qrImageBuffer = await readFileAsync(qrImagePath)

		return qrImageBuffer
	} catch (e) {
		throwErrors(`Error reading qr: ${qrName}`)
	}
}

module.exports = { readQRImage, readQRImageFile }
