const { Schema, model } = require('mongoose')

const QRSchema = new Schema({
	ticketId: String,
	qrCode: String,
	creationDate: {
		type: Date,
		default: Date.now,
	},
	activated: {
		type: Boolean,
		default: false,
	},
	activationDate: {
		type: Date,
		default: Date.now,
	},
})

QRSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject.__v
	},
})

module.exports = model('QR', QRSchema)
