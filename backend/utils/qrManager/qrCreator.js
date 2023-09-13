const qr = require('qrcode')
const { QR_CONTAINER } = require('../config')
const { throwErrors } = require('../middleware/throwErrors')
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
		const qrFilePath = path.join(QR_CONTAINER, `${qrName}.png`)

		try {
			await fs.access(qrFilePath, fs.constants.F_OK)
		} catch (err) {
			console.log(` ${qrName}.png no existe.`)
			return
		}

		await fs.unlink(qrFilePath)
		console.log(`QR with filename${qrName}.png has been deleted.`)
	} catch (error) {
		throwErrors(`Error deleting QR ${qrName}.png: ${error.message}`)
	}
}

module.exports = {
	deleteQRFile,
}

module.exports = {
	generateQRCode,
	deleteQRFile,
}
