const qr = require('qrcode')
const fs = require('fs').promises
const path = require('path')

const { QR_CONTAINER } = require('../config')
const { throwErrors } = require('../middleware/throwErrors')

const actualPath = process.env.PWD ? process.env.PWD : process.cwd()

const generateQRCode = async (text, qrName) => {
	try {
		const qrFilePath = path.join(actualPath, QR_CONTAINER, `${qrName}.png`)

		await qr.toFile(qrFilePath, text)
	} catch (error) {
		throwErrors(`Error generating QR code file: ${error}`)
	}
}

async function deleteQRFile(qrName) {
	try {
		const qrFilePath = path.join(actualPath, QR_CONTAINER, qrName)

		try {
			await fs.access(qrFilePath, fs.constants.F_OK)
		} catch (err) {
			console.log(` ${qrName} no existe.`)
			return
		}

		await fs.unlink(qrFilePath)
		console.log(`QR with filename ${qrName} has been deleted.`)
	} catch (error) {
		console.error(`Error deleting QR ${qrName}: ${error.message}`)
	}
}

module.exports = {
	deleteQRFile,
}

module.exports = {
	generateQRCode,
	deleteQRFile,
}
