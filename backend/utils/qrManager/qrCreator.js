const qr = require('qrcode')
const fs = require('fs').promises
const path = require('path')

const { QR_CONTAINER } = require('../config')
const { throwErrors } = require('../middleware/throwErrors')

const generateQRCode = async (text, qrName) => {
	try {
		const qrFilePath = path.join(
			__dirname,
			'..',
			'..',
			QR_CONTAINER,
			`${qrName}.png`
		)
		await qr.toFile(qrFilePath, text)
	} catch (error) {
		throwErrors(`Error generating QR code file: ${error}`, `generateQRCode`)
	}
}

async function deleteQRFile(qrName) {
	try {
		const qrFilePath = path.join(__dirname, '..', '..', QR_CONTAINER, qrName)

		try {
			await fs.access(qrFilePath, fs.constants.F_OK)
		} catch (err) {
			console.log(` ${qrName} no existe.`)
			return
		}

		await fs.unlink(qrFilePath)
		console.log(`QR with filename ${qrName} has been deleted.`)
	} catch (error) {
		throwErrors(`Error deleting QR ${qrName}: ${error.message}`, `deleteQRFile`)
	}
}

module.exports = {
	generateQRCode,
	deleteQRFile,
}
