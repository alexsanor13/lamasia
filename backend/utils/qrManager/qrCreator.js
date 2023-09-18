const qr = require('qrcode')
const fs = require('fs').promises
const path = require('path')

const { QR_CONTAINER, debugMode } = require('../config')
const { throwErrors } = require('../middleware/throwErrors')

let actualPath = ''
if (debugMode) {
	const actualPath = process.env.PWD ? process.env.PWD : process.cwd()
	actualPath = path.join(actualPath, QR_CONTAINER)
} else {
	actualPath = `.${QR_CONTAINER}`
}

const generateQRCode = async (text, qrName) => {
	try {
		const qrFilePath = `${actualPath}${qrName}.png`
		await qr.toFile(qrFilePath, text)
	} catch (error) {
		throwErrors(`Error generating QR code file: ${error}`)
	}
}

async function deleteQRFile(qrName) {
	try {
		const qrFilePath = `${actualPath}${qrName}`
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
