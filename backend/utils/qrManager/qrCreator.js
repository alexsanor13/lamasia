const qr = require('qrcode')

const generateQRCode = async (text, outputPath) => {
	try {
		await qr.toFile(`${outputPath}.png`, text)
	} catch (error) {
		console.error('Error generating QR code:', error)
	}
}

module.exports = {
	generateQRCode,
}
