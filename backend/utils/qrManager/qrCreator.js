const qr = require('qrcode')
const { QR_CONTAINER } = require('../config')
const { throwErrors } = require('../middleware/throwErrors')
const fs = require('fs').promises
const path = require('path')

const generateQRCode = async (text, outputPath) => {
	try {
		await qr.toFile(`${outputPath}.png`, text)
	} catch (error) {
		throwErrors(`Error generating QR code file: ${error}`)
	}
}

async function deleteQRFile(qrName) {
	try {
		const qrFilePath = `${QR_CONTAINER}${qrName}`

		try {
			await fs.access(qrFilePath, fs.constants.F_OK) // Utiliza await
		} catch (err) {
			console.log(` ${qrName} no existe.`)
			return
		}

		await fs.unlink(qrFilePath) // Utiliza await
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
