const qr = require('qrcode')
const fs = require('fs').promises
const { ROOT_PATH } = require('../config')

const { throwErrors } = require('../middleware/throwErrors')

const generateQRCode = async (text, qrName) => {
	try {
		const qrFilePath = `${ROOT_PATH}${qrName}.png`
		await qr.toFile(qrFilePath, text)
	} catch (error) {
		throwErrors(`Error generating QR code file: ${error}`)
	}
}

async function deleteQRFile(qrFileName) {
	try {
		const qrFilePath = `${ROOT_PATH}${qrFileName}`
		try {
			await fs.access(qrFilePath, fs.constants.F_OK)
		} catch (err) {
			console.log(`${qrFileName} no existe.`)
			return
		}

		await fs.unlink(qrFilePath)
		console.log(`QR with filename ${qrFileName} has been deleted.`)
	} catch (error) {
		console.error(`Error deleting QR ${qrFileName}: ${error.message}`)
	}
}

module.exports = {
	generateQRCode,
	deleteQRFile,
}
