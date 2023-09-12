const { Schema, model } = require('mongoose')

const TransactionSchema = new Schema({
	id: Number,
	email: String,
	amount: Number,
	tickets: Number,
	packTickets: Number,
	purchaseInfo: String,
	date: {
		type: Date,
		default: Date.now,
	},
	orderId: String,
	eventId: Number,
})

TransactionSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject.__v
		delete returnedObject._id
	},
})

module.exports = model('Transaction', TransactionSchema)
