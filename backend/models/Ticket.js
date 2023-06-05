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
	packTicket: {
		type: Boolean,
		default: false,
	},
})

TicketSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject.__v
	},
})

module.exports = model('Ticket', TicketSchema)
