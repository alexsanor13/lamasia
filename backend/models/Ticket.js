const { Schema, model } = require('mongoose')

const TicketSchema = new Schema({
	id: Number,
	transactionId: Number,
	eventId: Number,
	creationDate: {
		type: Date,
		default: Date.now,
	},
	packTicket: {
		type: Boolean,
		default: false,
	},
})

TicketSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject.__v
		delete returnedObject._id
	},
})

module.exports = model('Ticket', TicketSchema)
