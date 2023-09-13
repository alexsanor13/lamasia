const qr = require('qrcode')
const { QR_CONTAINER } = require('../config')
const { throwErrors } = require('../middleware/throwErrors')

const generateQRCode = async (text, outputPath) => {
	try {
		await qr.toFile(`${outputPath}.png`, text)
	} catch (error) {
		throwErrors(`Error generating QR code file: ${error}`)
	}
}

// TODO REVISAR
const deleteQRFile = async (name) => {
	try {
		const path = `${QR_CONTAINER}${name}`
		fs.unlink(path, (err) => {
			if (err) {
				throw err
			} else {
				console.log('QR temp file deleted')
			}
		})
	} catch (e) {
		throwErrors(`Error deleting the qr files: ${e}`)
	}
}

module.exports = {
	generateQRCode,
	deleteQRFile,
}
