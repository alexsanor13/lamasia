const qr = require('qrcode')
const fs = require('fs').promises

const { throwErrors } = require('../middleware/throwErrors')

const generateQRCode = async (text, qrPath) => {
	try {
		const qrFilePath = `${qrPath}.png`
		await qr.toFile(qrFilePath, text)
	} catch (error) {
		throwErrors(`Error generating QR code file: ${error}`)
	}
}

async function deleteQRFile(qrPath, qrFileName) {
	try {
		const qrFilePath = `${qrPath}${qrFileName}`
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
