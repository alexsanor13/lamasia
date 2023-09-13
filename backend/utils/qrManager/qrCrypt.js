const crypto = require('crypto')
const { CRYPT_QR } = require('../config')
const { throwErrors } = require('../middleware/throwErrors')

// Asegúrate que la llave sea de longitud 32
const key = crypto
	.createHash('sha256')
	.update(String(CRYPT_QR))
	.digest('base64')
	.substring(0, 32)

const iv_length = 16

function encrypt(text) {
	try {
		let iv = crypto.randomBytes(iv_length)
		let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv)
		let encrypted = cipher.update(text)
		encrypted = Buffer.concat([encrypted, cipher.final()])
		return iv.toString('hex') + ':' + encrypted.toString('hex')
	} catch (e) {
		throwErrors(`Error encrypting qr: ${e}`)
	}
}

function decrypt(text) {
	try {
		let textParts = text.split(':')
		let iv = Buffer.from(textParts.shift(), 'hex')
		let encryptedText = Buffer.from(textParts.join(':'), 'hex')
		let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv)
		let decrypted = decipher.update(encryptedText)
		decrypted = Buffer.concat([decrypted, decipher.final()])
		return decrypted.toString()
	} catch (e) {
		throwErrors(`Error decrypting qr: ${e}`)
	}
}

module.exports = { encrypt, decrypt }
