const qr = require('qrcode')
const { QR_CONTAINER } = require('../config')

const generateQRCode = async (text, outputPath) => {
	try {
		await qr.toFile(`${outputPath}.png`, text)
	} catch (error) {
		console.error('Error generating QR code:', error)
	}
}

// TODO REVISAR
const deleteQRFile = async (name) => {
	const path = `${QR_CONTAINER}${name}`
	fs.unlink(path, (err) => {
		if (err) {
			console.error('Error deleting file:', err)
		} else {
			console.log('QR temp file deleted')
		}
	})
}

module.exports = {
	generateQRCode,
	deleteQRFile,
}
