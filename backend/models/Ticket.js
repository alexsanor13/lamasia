const { Schema, model } = require('mongoose')

const TicketSchema = new Schema({
	transactionId: String,
	eventId: String,
	qrCode: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
	redeemed: {
		type: Boolean,
		default: false,
	},
	extra: String,
})

TicketSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject.__v
	},
})

module.exports = model('Ticket', TicketSchema)
